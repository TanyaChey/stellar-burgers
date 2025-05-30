import React, { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Подключение компонентов
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  FeedPage,
  NewFeedPage,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedDetails from '../feed-details/feed-details';
import FeedStatus from '../feed-status/feed-status';
import FeedUser from '../feed-user/feed-user';
import ProfileForm from '../profile-form/profile-form';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

// Основной компонент для управления маршрутизацией
const Router: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  const routesBackground = [
    {
      path: '/ingredients/:ingredientId',
      element: (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      ),
    },
    {
      path: '/feed/:feedNumber',
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: '/feed/:feedNumber/status',
      element: (
        <Modal onClose={closeModal}>
          <FeedStatus />
        </Modal>
      ),
    },
    {
      path: '/new-feed',
      element: (
        <Modal onClose={closeModal}>
          <NewFeedPage />
        </Modal>
      ),
    },
    {
      path: '/profile/orders/:feedNumber',
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: '/profile/orders/:feedNumber/status',
      element: (
        <Modal onClose={closeModal}>
          <FeedStatus />
        </Modal>
      ),
    },
  ];

  // Определение маршрутов приложения
  return (
    <>
      <Routes location={background || location}>
        <Route index element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientDetails />}>
          <Route path=":ingredientId" element={<IngredientDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<OnlyUnAuth element={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<FeedUser />}>
            <Route path=":feedNumber" element={<FeedDetails />} />
            <Route path=":feedNumber/status" element={<FeedStatus />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/feed" element={<FeedPage />}>
          <Route path=":feedNumber" element={<FeedDetails />} />
          <Route path=":feedNumber/status" element={<FeedStatus />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          {routesBackground.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      )}
    </>
  );
};

export default Router;
