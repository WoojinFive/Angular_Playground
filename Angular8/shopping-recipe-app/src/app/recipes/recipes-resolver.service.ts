import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })

export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { // reload 할때마다 recipes 갖고옴. routing에 추가 해줘야함.
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes(); // 처음 fetch 하는거면 data 갖고옴
    } else {
      return recipes; // 이미 fetch된 상태이면 기존 data 사용.
    }

    
  }
}