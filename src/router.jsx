import { createBrowserRouter } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import Home from './pages/Home.jsx';
import Lessons from './pages/Lessons.jsx';
import Lesson from './pages/Lesson.jsx';
import KuuList from './pages/KuuList.jsx';
import KuuDetail from './pages/KuuDetail.jsx';
import Komuz from './pages/Komuz.jsx';
import Instruments from './pages/Instruments.jsx';
import Tuner from './pages/Tuner.jsx';
import Progress from './pages/Progress.jsx';
import Auth from './pages/Auth.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Бардык барактар AppShell (сол меню, оң панель, footer) ичинде ачылат.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sabaktar', element: <Lessons /> },
      { path: 'sabaktar/:slug', element: <Lesson /> },
      { path: 'kuu', element: <KuuList /> },
      { path: 'kuu/:slug', element: <KuuDetail /> },
      { path: 'komuz', element: <Komuz /> },
      { path: 'aspaptar', element: <Instruments /> },
      { path: 'akort', element: <Tuner /> },
      { path: 'progress', element: <Progress /> },
      { path: 'kirish', element: <Auth /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
