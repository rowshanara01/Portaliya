import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Authentication/AuthProvider/AuthProvider";
import useFirebase from './Authentication/useFirebase/useFirebase';
import AddReview from "./Pages/AddReview/AddReview";
import AdminHome from './Pages/AdminHome/AdminHome';
import Homepage from "./Pages/Homepage/Homepage";
import Hotlines from "./Pages/Hotlines/Hotlines";
import Login from "./Pages/Login/Login";
import ManageComplain from "./Pages/ManageComplain/ManageComplain";
import ManageReview from "./Pages/ManageReview/ManageReview";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import NotFound from "./Pages/NotFound/NotFound";
import PostComplain from "./Pages/PostComplain/PostComplain";
import Registration from "./Pages/Registration/Registration";
import Reviews from "./Pages/Reviews/Reviews";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import UpdateReview from "./Pages/UpdateReview/UpdateReview";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import MyComplain from "./Pages/UserHomePage/MyComplain/MyComplain";
import MyReviews from "./Pages/UserHomePage/MyReviews/MyReviews";
import UserHome from "./Pages/UserHomePage/UserHome";
import PrivateRoute from './Authentication/PrivateRoute/PrivateRoute';
import AdminRoute from './Authentication/AdminRoute/AdminRoute';
import { HelmetProvider } from 'react-helmet-async';
import useAuth from './Authentication/useAuth/useAuth';
import useAxiosSecure from './Authentication/useAxiosSecure/useAxiosSecure';

// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();


function App() {
  const { user, loading, setLoading } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [axiosSecure] = useAxiosSecure();

  // to solve header img, userhome's user data update automatically.
  // it changes in Header, UserHome, UpdateUser 
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await axiosSecure.get(`/users?email=${user?.email}`);
          if (response.data.length > 0) {
            setUserInfo(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } 
      else {
        setUserInfo({});
      }
    };

    fetchUserData();
  }, [user]);


  return (
    <div>
        <AuthProvider>
          <QueryClientProvider client={queryClient} >
            <HelmetProvider>
              <BrowserRouter>
                  <Header userInfo={userInfo} setUserInfo={setUserInfo}  ></Header>
                  <Routes>
                    {/* homepage */}
                    <Route path="/" element={ <Homepage></Homepage> } ></Route>
                    {/* login page */}
                    <Route path="/login" element={ <Login></Login> } ></Route>
                    {/* registration page */}
                    <Route path="/register" element={ <Registration></Registration> } ></Route>
                    {/* hotlines */}
                    <Route path="/hotlines" element={ <Hotlines></Hotlines> } ></Route>
                    {/* reviews */}
                    <Route path="/reviews"  element={ <Reviews></Reviews> } ></Route>

                    {/* user home. nested route. private route */}
                    <Route path="/userhome"  element={ 
                        <PrivateRoute>
                          <UserHome userInfo={userInfo} setUserInfo={setUserInfo} ></UserHome> 
                        </PrivateRoute>
                      } >
                      <Route path="" element={ <MyReviews  userInfo={userInfo} setUserInfo={setUserInfo} ></MyReviews> } ></Route>
                      <Route path="mycomplain" element={ <MyComplain></MyComplain> } ></Route>
                    </Route>

                    {/* update user. private route */}
                    <Route path='/userhome/update/:id' element={ 
                      <PrivateRoute>
                        <UpdateUser setUserInfo={setUserInfo} ></UpdateUser> 
                      </PrivateRoute>
                      }  ></Route>

                    {/* post complain here */}
                    <Route path="/postcomplains" element={ 
                      <PrivateRoute>
                        <PostComplain userInfo={userInfo} setUserInfo={setUserInfo}  ></PostComplain>
                      </PrivateRoute>
                      } 
                      ></Route>
                    {/* add review. private route */}
                    <Route path="/addreview"  element={ 
                      <PrivateRoute>
                        <AddReview userInfo={userInfo} setUserInfo={setUserInfo}  ></AddReview>
                      </PrivateRoute>
                      } ></Route>
                    {/* update review. private route */}
                    <Route path='/userhome/review/:id'  element={ 
                      <PrivateRoute>
                        <UpdateReview></UpdateReview>
                      </PrivateRoute>
                      } ></Route>

                    {/* ***admin routes*** */}
                    {/* admin home */}
                    <Route path="/adminhome" element={ 
                      <AdminRoute>
                        <AdminHome userInfo={userInfo} setUserInfo={setUserInfo} ></AdminHome>
                      </AdminRoute>
                      } ></Route>
                    {/* manage user */}
                    <Route path="/manageuser" element={ 
                      <AdminRoute>
                        <ManageUsers></ManageUsers>
                      </AdminRoute>
                      } > </Route>
                    {/* manage reviews */}
                    <Route path="/managereview" element={ 
                      <AdminRoute>
                        <ManageReview></ManageReview>
                      </AdminRoute>
                      } ></Route>
                    {/* manage complain */}
                    <Route path="/managecomplain" element={ 
                      <AdminRoute>
                        <ManageComplain></ManageComplain> 
                      </AdminRoute>
                      } ></Route>

                    <Route path='*' element={ <NotFound></NotFound> } ></Route>
                  </Routes>
                  <Footer></Footer>
              </BrowserRouter>
          </HelmetProvider>
          </QueryClientProvider>
        </AuthProvider>
    </div>
  )
}

export default App;