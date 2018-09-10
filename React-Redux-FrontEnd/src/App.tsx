import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { RegisterComponent } from './components/first/register.component';
import { SecondComponent } from './components/second/second.component';
// import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  HomeComponent  from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import ClickerComponent from './components/clicker/clicker.component';
import { TicTacComponent } from './components/tic-tac/tic-tac.component';
import ChuckNorrisComponent from './components/chuck-norris/chuck-norris.component';
import PokemonComponent from './components/pokemon/pokemon.component';
import { MoviesComponent } from './components/movies/movie.component';
import { NestedComponent } from './components/nested/nested.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import signInComponent from './components/sign-in/sign-in.component';
import  FmHomeComponent  from './components/home/fm-home.component';

class App extends React.Component {

  public componentDidMount() {
    document.title = "Reasonable Reimbursements";
  }
  public render() {
    {document.body.className = "bg-secondary"}
    return (
      <Provider store={store}>
        <BrowserRouter>
            <div id="main-content-container">
              <Switch>
                <Route path="/register" component={RegisterComponent} />
                <Route path="/second" component={SecondComponent} />
                <Route path="/home" component={HomeComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/clicker" component={ClickerComponent} />
                <Route path="/tic-tac-toe" component={TicTacComponent} />
                <Route path="/chuck-norris" component={ChuckNorrisComponent} />
                <Route path="/pokemon" component={PokemonComponent} />
                <Route path="/movies" component={MoviesComponent} />
                <Route path="/nested" component={NestedComponent} />
                <Route path="/fmhome" component={FmHomeComponent} />
                <Route component={signInComponent} />
              </Switch>
            </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
