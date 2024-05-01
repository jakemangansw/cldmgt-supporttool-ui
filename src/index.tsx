import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PokerGameRoute from './components/Navigation/Routes/PokerGameRoute/PokerGameRoute';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountInformationRoute from './components/Navigation/Routes/AccountInformationRoute/AccountInformationRoute';
import ProtectedAdminRoute from './components/Auth/ProtectedAdminRoute/ProtectedAdminRoute';
import Login from './components/Auth/Login/Login';
import SupportApp from './components/SupportApp/SupportApp';
import ProtectedLoginRoute from './components/Auth/ProtectedLoginRoute/ProtectedLoginRoute';
import SupportAppOnboarding from './components/SupportApp/SupportAppOnboarding/SupportAppOnboarding';
import ProtectedApprovedRoleRoute from './components/Auth/ProtectedApprovedRoleRoute/ProtectedApprovedRoleRoute';
import UserManagementRoute from './components/Navigation/Routes/UserManagementRoute/UserManagementRoute';
import IFrameTestRoute from './components/Navigation/Routes/IFrameTest/IFrameTestRoute';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/app",
    element: <ProtectedLoginRoute />,
    children: [
      {
        path: "",
        element: <ProtectedApprovedRoleRoute />,
        children: [
          {
            path: "",
            element: <SupportApp />,
            children: [
              {
                path: 'poker',
                element: <PokerGameRoute />
              },
              {
                path: 'iframe-test',
                element: <IFrameTestRoute/>
              },
              {
                path: 'admin',
                element: <ProtectedAdminRoute />,
                children: [
                  {
                    path: "user-management",
                    element: <UserManagementRoute/>
                  }
                ]
              },
              {
                path: "account",
                element: <AccountInformationRoute />
              }
            ]
          }
        ]
      },
      {
        path: "onboarding",
        element: <SupportAppOnboarding></SupportAppOnboarding>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="883289560272-flkeijh573d9jijt2g1cauqfsknb1mku.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </ChakraProvider >
);