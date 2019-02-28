import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../pages/home';
import Login from '../components/loginForm';
import Logout from '../components/logout';
import Register from '../components/registerForm';
import RegisterAdmin from '../components/registerAdminForm';
import EditUserForm from '../components/editUserForm';

import Dashboard from '../pages/admin/dashboard';

import NotFound from '../pages/notfound';
import NotAllowed from '../pages/notallowed';

import Movie from '../pages/movie/show';
import Movies from '../pages/movie/all';
import ScoreBoard from '../pages/movie/scoreboard';
import MovieList from '../pages/movie/list';
import MovieCreate from '../pages/movie/create';
import MovieStats from '../pages/movie/stats';


import UserList from '../pages/user/list';
import UserCreate from '../pages/user/create';
import UserProfile from '../pages/user/show';

import Genre from '../pages/genre/all';
import GenreList from '../pages/genre/list';
import GenreCreate from '../pages/genre/create';

import Subscription from '../pages/transaction/subscription';
import Verify from '../pages/transaction/verify';
import Payment from '../pages/transaction/payment';
import ThankYou from '../pages/transaction/success';

import CustomerDash from '../pages/admin/mybookings';
import UserMovieHistory from '../pages/admin/moveHistory';
import TopUsers from '../pages/admin/topusers';
import TopMovies from '../pages/admin/topmovies';
import Finance from '../pages/admin/finance';
import MyTransactions from '../pages/mytransactions';

import UserSubscribed from '../pages/admin/usersubscribed';
import UserPayed from '../pages/admin/userpayed';
import UserActive from '../pages/admin/useractive';
import UserAll from '../pages/admin/userall';

import AdminTransactions from '../pages/admintransactions/list';


const Router = () => (

   <BrowserRouter>
      <Switch>
         <Route exact path="/" component={HomePage} />

         <Route exact path="/login" component={Login} />
         <Route exact path="/logout" component={Logout} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/admin/register" component={RegisterAdmin} />

         <Route exact path="/dashboard" component={Dashboard} />
         <Route exact path="/dashboard/profile/:slug" component={EditUserForm} />

         <Route exact path="/dashboard/movies" component={MovieList} />
         <Route exact path="/dashboard/movie/new" component={MovieCreate} />
         <Route exact path="/dashboard/movie/stats/:slug" component={MovieStats} />
         <Route exact path="/dashboard/movie/edit/:slug" component={MovieCreate} />

         <Route exact path="/dashboard/genre" component={GenreList} />
         <Route exact path="/dashboard/genre/new" component={GenreCreate} />
         <Route exact path="/dashboard/genre/edit/:slug" component={GenreCreate} />


         <Route exact path="/dashboard/admintransactions" component={AdminTransactions} />



         <Route exact path="/dashboard/users" component={UserList} />
         <Route exact path="/dashboard/user/new" component={UserCreate} />
         <Route exact path="/dashboard/user/edit/:slug" component={UserCreate} />
         <Route exact path="/dashboard/user/history/:slug" component={UserMovieHistory} />
         <Route exact path="/dashboard/admin/topusers" component={TopUsers} />
         <Route exact path="/dashboard/admin/topmovies" component={TopMovies} />
         <Route exact path="/dashboard/admin/finance" component={Finance} />

         <Route exact path="/dashboard/admin/usersubscribed" component={UserSubscribed} />
         <Route exact path="/dashboard/admin/userpay" component={UserPayed} />
         <Route exact path="/dashboard/admin/active" component={UserActive} />
         <Route exact path="/dashboard/admin/all" component={UserAll} />

         <Route exact path="/dashboard/bookings" component={CustomerDash} />
         <Route exact path="/dashboard/transactions" component={MyTransactions} />


         <Route exact path="/subscription" component={Subscription} />
         <Route exact path="/verfiy" component={Verify} />
         <Route exact path="/transaction/payment" component={Payment} />
         <Route exact path="/transaction/success/:id" component={ThankYou} />


         <Route exact path="/user/:slug" component={UserProfile} />

         <Route exact path="/movies" component={Movies} />
         <Route exact path="/scoreboard" component={ScoreBoard} />
         <Route exact path="/movie/:slug" component={Movie} />

         <Route exact path="/genre" component={Genre} />
         <Route exact path="/genre/:slug" component={Genre} />

         <Route exact path="/notallowed" component={NotAllowed} />

         <Route component={NotFound} />

      </Switch>
   </BrowserRouter>

)

export default Router;