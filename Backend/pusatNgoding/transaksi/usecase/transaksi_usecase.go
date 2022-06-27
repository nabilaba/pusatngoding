package usecase

import (
	"context"
	"pusat-ngoding/domain"
	"time"

	"github.com/sirupsen/logrus"
	"golang.org/x/sync/errgroup"
)

type transaksi struct {
	transaksiRepo domain.TransaksiRepository
	userRepo      domain.UserRepository
	kursusRepo    domain.KursusRepository
	ctxTimeout    time.Duration
}

func NewTransaksiUseCase(transaksiRepo domain.TransaksiRepository, userRepo domain.UserRepository, kursusRepo domain.KursusRepository, ctxTimeout time.Duration) domain.TransaksiUseCase {
	return &transaksi{
		transaksiRepo: transaksiRepo,
		userRepo:      userRepo,
		kursusRepo:    kursusRepo,
		ctxTimeout:    ctxTimeout,
	}
}

func (t *transaksi) getUsers(ctx context.Context, result []domain.TransaksiResp) ([]domain.TransaksiResp, error) {
	g, c := errgroup.WithContext(ctx)

	mapUser := map[int64]domain.User{}

	for _, transaksi := range result {
		mapUser[transaksi.Users.Id] = domain.User{}
	}

	chanUser := make(chan domain.User)
	for userID := range mapUser {
		userID := userID
		g.Go(func() error {
			res, err := t.userRepo.GetById(c, userID)
			if err != nil {
				return err
			}
			chanUser <- res
			return nil
		})
	}

	go func() {
		err := g.Wait()
		if err != nil {
			logrus.Error(err)
			return
		}
		close(chanUser)
	}()

	for user := range chanUser {
		if user != (domain.User{}) {
			mapUser[user.Id] = user
		}
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	for index, item := range result {
		if u, ok := mapUser[item.Users.Id]; ok {
			result[index].Users = u
		}
	}

	return result, nil
}

func (t *transaksi) getKursus(ctx context.Context, result []domain.TransaksiResp) ([]domain.TransaksiResp, error) {
	g, c := errgroup.WithContext(ctx)

	mapKursus := map[int64]domain.KursusResp{}

	for _, transaksi := range result {
		mapKursus[transaksi.Kursus.Id] = domain.KursusResp{}
	}

	chanKursus := make(chan domain.KursusResp)
	for kursusID := range mapKursus {
		kursusID := kursusID
		g.Go(func() error {
			res, err := t.kursusRepo.GetById(c, kursusID)
			if err != nil {
				return err
			}

			user, err := t.userRepo.GetById(c, res.User.Id)
			if err != nil {
				return err
			}

			res.User = user

			chanKursus <- res
			return nil
		})
	}

	go func() {
		err := g.Wait()
		if err != nil {
			logrus.Error(err)
			return
		}
		close(chanKursus)
	}()

	for kursus := range chanKursus {
		if kursus != (domain.KursusResp{}) {
			mapKursus[kursus.Id] = kursus
		}
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	for index, item := range result {
		if k, ok := mapKursus[item.Kursus.Id]; ok {
			result[index].Kursus = k
		}
	}

	return result, nil
}

func (t *transaksi) GetAll(ctx context.Context) ([]domain.TransaksiResp, error) {
	c, cancel := context.WithTimeout(ctx, t.ctxTimeout)

	defer cancel()

	res, err := t.transaksiRepo.GetAll(c)
	if err != nil {
		return nil, err
	}

	res, err = t.getUsers(c, res)
	if err != nil {
		return nil, err
	}

	res, err = t.getKursus(c, res)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (t *transaksi) GetById(ctx context.Context, id int64) (domain.TransaksiResp, error) {
	c, cancel := context.WithTimeout(ctx, t.ctxTimeout)

	defer cancel()

	res, err := t.transaksiRepo.GetById(c, id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	user, err := t.userRepo.GetById(c, res.Users.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus, err := t.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	mentor, err := t.userRepo.GetById(c, kursus.User.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus.User = mentor

	res.Users = user
	res.Kursus = kursus

	return res, nil
}

func (t *transaksi) Store(ctx context.Context, transaksi *domain.Transaksi) (domain.TransaksiResp, error) {
	c, cancel := context.WithTimeout(ctx, t.ctxTimeout)

	defer cancel()

	res, err := t.transaksiRepo.Store(c, transaksi)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	user, err := t.userRepo.GetById(c, res.Users.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus, err := t.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	mentor, err := t.userRepo.GetById(c, kursus.User.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus.User = mentor

	res.Users = user
	res.Kursus = kursus

	return res, nil
}

func (t *transaksi) Update(ctx context.Context, id int64, transaksi *domain.Transaksi) (domain.TransaksiResp, error) {
	c, cancel := context.WithTimeout(ctx, t.ctxTimeout)

	defer cancel()

	res, err := t.transaksiRepo.Update(c, id, transaksi)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	user, err := t.userRepo.GetById(c, res.Users.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus, err := t.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	mentor, err := t.userRepo.GetById(c, kursus.User.Id)
	if err != nil {
		return domain.TransaksiResp{}, err
	}

	kursus.User = mentor

	res.Users = user
	res.Kursus = kursus

	return res, nil
}

func (t *transaksi) Delete(ctx context.Context, id int64) error {
	c, cancel := context.WithTimeout(ctx, t.ctxTimeout)

	defer cancel()

	err := t.transaksiRepo.Delete(c, id)
	if err != nil {
		return err
	}

	return nil
}
