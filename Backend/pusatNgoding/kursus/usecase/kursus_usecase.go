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
	userRepo   domain.UserRepository
	ctxTimeout time.Duration
}

func NewKursusUseCase(kursusRepo domain.KursusRepository, userRepo domain.UserRepository, ctxTimeout time.Duration) domain.KursusUseCase {
	return &kursus{
		kursusRepo: kursusRepo,
		userRepo:   userRepo,
		ctxTimeout: ctxTimeout,
	}
}

func (k *kursus) getUsers(ctx context.Context, result []domain.KursusResp) ([]domain.KursusResp, error) {
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

func (k *kursus) GetAll(ctx context.Context) ([]domain.KursusResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.kursusRepo.GetAll(c)
	if err != nil {
		return []domain.KursusResp{}, err
	}

	res, err = k.getUsers(c, res)
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

	user, err := k.userRepo.GetById(c, res.User.Id)
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

	user, err := k.userRepo.GetById(c, res.User.Id)
	if err != nil {
		return domain.KursusResp{}, err
	}

	res.User = user

	return res, nil
}

func (k *kursus) Update(ctx context.Context, id int64, kursus *domain.Kursus) (domain.KursusResp, error) {
	c, cancel := context.WithTimeout(ctx, k.ctxTimeout)

	defer cancel()

	res, err := k.kursusRepo.Update(c, id, kursus)
	if err != nil {
		return domain.KursusResp{}, err
	}

	user, err := k.userRepo.GetById(c, res.User.Id)
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
