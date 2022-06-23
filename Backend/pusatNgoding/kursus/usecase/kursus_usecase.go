package usecase

import (
	"context"
	"pusat-ngoding/domain"
	"time"

	"github.com/sirupsen/logrus"

	"golang.org/x/sync/errgroup"
)

type kursus struct {
	kursusRepo domain.KursusRepository
	usersRepo  domain.UserRepository
	ctxTimeout time.Duration
}

func NewKursusNewUseCase(kursusRepo domain.KursusRepository, usersRepo domain.UserRepository, ctxTimeout time.Duration) domain.KursusUseCase {
	return &kursus{
		kursusRepo: kursusRepo,
		usersRepo:  usersRepo,
		ctxTimeout: ctxTimeout,
	}
}

func (k *kursus) fillUsersDetails(ctx context.Context, listKursus []domain.KursusResp) ([]domain.KursusResp, error) {
	g, ctx := errgroup.WithContext(ctx)

	users := map[int64]domain.User{}

	for _, kursus := range listKursus {
		users[kursus.User.Id] = domain.User{}
	}

	userChan := make(chan domain.User)
	for idUser := range users {
		idUser := idUser
		g.Go(func() error {
			user, err := k.usersRepo.GetById(ctx, idUser)
			if err != nil {
				return err
			}

			userChan <- user
			return nil
		})
	}

	go func() {
		err := g.Wait()
		if err != nil {
			logrus.Error(err)
			return
		}
		close(userChan)
	}()

	for user := range userChan {
		if user != (domain.User{}) {
			users[user.Id] = user
		}
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}

	for i, l := range listKursus {
		if u, ok := users[l.User.Id]; ok {
			listKursus[i].User = u
		}
	}

	return listKursus, nil
}

func (k *kursus) GetAll(ctx context.Context) ([]domain.KursusResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.kursusRepo.GetAll(c)
	if err != nil {
		return []domain.KursusResp{}, err
	}

	res, err = k.fillUsersDetails(c, res)
	if err != nil {
		return []domain.KursusResp{}, err
	}

	return res, nil
}

func (k *kursus) GetById(ctx context.Context, id int64) (domain.KursusResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.kursusRepo.GetById(c, id)
	if err != nil {
		return domain.KursusResp{}, err
	}

	user, err := k.usersRepo.GetById(c, id)
	if err != nil {
		return domain.KursusResp{}, err
	}

	res.User = user

	return res, nil
}

func (k *kursus) Store(ctx context.Context, kursus *domain.Kursus) (domain.KursusResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.kursusRepo.Store(c, kursus)
	if err != nil {
		return domain.KursusResp{}, err
	}

	user, err := k.usersRepo.GetById(c, res.Id)
	if err != nil {
		return domain.KursusResp{}, err
	}

	res.User = user

	return res, nil
}

func (k *kursus) Delete(ctx context.Context, id int64) error {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	err := k.kursusRepo.Delete(c, id)
	if err != nil {
		return err
	}

	return nil
}
