import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Login from './components/Auth/Login/Login';
import ProtectedAdminRoute from './components/Auth/ProtectedAdminRoute/ProtectedAdminRoute';
import ProtectedApprovedRoleRoute from './components/Auth/ProtectedApprovedRoleRoute/ProtectedApprovedRoleRoute';
import ProtectedLoginRoute from './components/Auth/ProtectedLoginRoute/ProtectedLoginRoute';
import BlankRoute from './components/Iframes/blank-route/blank-route';
import UnprotectedIframe from './components/Iframes/unprotected-iframe/unprotected-iframe';
import ManyRequestRoute from './components/ManyRequestRoute/ManyRequestRoute';
import AccountInformationRoute from './components/Navigation/Routes/AccountInformationRoute/AccountInformationRoute';
import IFrameTestRoute from './components/Navigation/Routes/IFrameTest/IFrameTestRoute';
import PokerGameRoute from './components/Navigation/Routes/PokerGameRoute/PokerGameRoute';
import UserManagementRoute from './components/Navigation/Routes/UserManagementRoute/UserManagementRoute';
import VideoIdTestPageRoute from './components/Navigation/Routes/VideoIdTestPageRoute/VideoIdTestPageRoute';
import SupportApp from './components/SupportApp/SupportApp';
import SupportAppOnboarding from './components/SupportApp/SupportAppOnboarding/SupportAppOnboarding';
import './index.css';

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
    path: "/unprotected-iframe",
    element: <UnprotectedIframe />
  },
  {
    path: "/blank-route",
    element: <BlankRoute/>
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
                element: <IFrameTestRoute />
              },
              {
                path: 'video-id-test',
                element: <VideoIdTestPageRoute />
              },
              {
                path: 'many-requests',
                element: <ManyRequestRoute />
              },
              {
                path: 'admin',
                element: <ProtectedAdminRoute />,
                children: [
                  {
                    path: "user-management",
                    element: <UserManagementRoute />
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