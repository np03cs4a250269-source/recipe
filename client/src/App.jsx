import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import ViewRecipe from "./pages/ViewRecipe";
import AddEditRecipe from "./pages/AddEditRecipe";
import IngredientList from "./pages/IngredientList";
import AddEditIngredient from "./pages/AddEditIngredient";
import UserRecipeList from "./pages/UserRecipeList";
import UserViewRecipe from "./pages/UserViewRecipe";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const NO_NAVBAR_ROUTES = ["/", "/register"];

function Layout() {
  const location = useLocation();
  const hideNavbar = NO_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <RecipeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <ViewRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/add"
          element={
            <ProtectedRoute>
              <AddEditRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients"
          element={
            <ProtectedRoute>
              <IngredientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients/add"
          element={
            <ProtectedRoute>
              <AddEditIngredient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditIngredient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-recipes"
          element={
            <ProtectedRoute>
              <UserRecipeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-recipes/:id"
          element={
            <ProtectedRoute>
              <UserViewRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
