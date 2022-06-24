package usecase

import (
	"context"
	"pusat-ngoding/domain"
	"time"

	"github.com/sirupsen/logrus"
	"golang.org/x/sync/errgroup"
)

type komentar struct {
	komenRepo  domain.KomentarRepository
	userRepo   domain.UserRepository
	kursusRepo domain.KursusRepository
	ctxTimeout time.Duration
}

func NewKomentarUseCase(komenRepo domain.KomentarRepository, userRepo domain.UserRepository, kursusRepo domain.KursusRepository, ctxTimeout time.Duration) domain.KomentarUseCase {
	return &komentar{
		komenRepo:  komenRepo,
		userRepo:   userRepo,
		kursusRepo: kursusRepo,
		ctxTimeout: ctxTimeout,
	}
}

func (k *komentar) getUsers(ctx context.Context, result []domain.KomentarResp) ([]domain.KomentarResp, error) {
	g, c := errgroup.WithContext(ctx)

	mapUser := map[int64]domain.User{}

	for _, kursus := range result {
		mapUser[kursus.User.Id] = domain.User{}
	}

	chanUser := make(chan domain.User)
	for userID := range mapUser {
		userID := userID
		g.Go(func() error {
			res, err := k.userRepo.GetById(c, userID)
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
		if u, ok := mapUser[item.User.Id]; ok {
			result[index].User = u
		}
	}

	return result, nil
}

func (k *komentar) getKursus(ctx context.Context, result []domain.KomentarResp) ([]domain.KomentarResp, error) {
	g, c := errgroup.WithContext(ctx)

	mapKursus := map[int64]domain.KursusResp{}

	for _, komen := range result {
		mapKursus[komen.Kursus.Id] = domain.KursusResp{}
	}

	chanKursus := make(chan domain.KursusResp)
	for kursusID := range mapKursus {
		kursusID := kursusID
		g.Go(func() error {
			res, err := k.kursusRepo.GetById(c, kursusID)
			if err != nil {
				return err
			}
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

func (k *komentar) GetAll(ctx context.Context) ([]domain.KomentarResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.komenRepo.GetAll(c)
	if err != nil {
		return []domain.KomentarResp{}, err
	}

	res, err = k.getUsers(c, res)
	if err != nil {
		return []domain.KomentarResp{}, err
	}

	res, err = k.getKursus(c, res)
	if err != nil {
		return []domain.KomentarResp{}, err
	}

	return res, nil
}

func (k *komentar) GetById(ctx context.Context, id int64) (domain.KomentarResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.komenRepo.GetById(c, id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	user, err := k.userRepo.GetById(c, res.User.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	kursus, err := k.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	res.User = user
	res.Kursus = kursus

	return res, nil
}

func (k *komentar) Store(ctx context.Context, komen *domain.Komentar) (domain.KomentarResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.komenRepo.Store(c, komen)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	user, err := k.userRepo.GetById(c, res.User.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	kursus, err := k.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	res.User = user
	res.Kursus = kursus

	return res, nil
}

func (k *komentar) Update(ctx context.Context, id int64, komen *domain.Komentar) (domain.KomentarResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.komenRepo.Update(c, id, komen)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	user, err := k.userRepo.GetById(c, res.User.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	kursus, err := k.kursusRepo.GetById(c, res.Kursus.Id)
	if err != nil {
		return domain.KomentarResp{}, err
	}

	res.User = user
	res.Kursus = kursus

	return res, nil
}

func (k *komentar) Delete(ctx context.Context, id int64) error {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	err := k.komenRepo.Delete(c, id)
	if err != nil {
		return err
	}

	return nil
}
