import { combineReducers } from "redux";
import { clickerReducer } from "./clicker.reducer";
import { signInReducer } from "./sign-in.reducer";
import { chuckNorrisReducer } from "./chuck-norris.reducer";
import { PokemonSprite } from "../model/PokemonSprite";
import { pokemonReducer } from "./pokemon-reducer";
import { homeReducer } from "./home.reducer";

export interface IChuckNorrisState {
  buyJokeEnabled: boolean,
  joke: string,
}

export interface IClickerState {
  clicks: number
}

export interface IPokemonState {
  pokeId: number,
  pokemon: {
    name: string,
    sprites: PokemonSprite[]
  } | null
}

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface IHomeState {
  reimbs: [{
    reimb_id: number,
    reimb_submitted: string,
    reimb_resolved:  string,
    reimb_description: string,
    reimb_receipt: string,
    reimb_author: number,
    reimb_resolver: number,
    reimb_status: string,
    reimb_type: string,
    reimb_amount: number
  }],
  filter: string
}

export interface IState {
  chuckNorris: IChuckNorrisState,
  clicker: IClickerState,
  pokemon: IPokemonState,
  signIn: ISignInState,
  home: IHomeState,
}

export const state = combineReducers<IState>({
  chuckNorris: chuckNorrisReducer,
  clicker: clickerReducer,
  home: homeReducer,
  pokemon: pokemonReducer,
  signIn: signInReducer,
})