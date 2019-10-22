import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  basket = new Map();

  restaurantBasket$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/restaurant`).pipe(
      map(( dish) => {
        return [...Object.values(dish)].reduce((acc, item) => [...acc, ...item]);
      })
    );
  }

  getDishById(type: string, id: number) {
    return this.http.get(`${this.baseUrl}/restaurant`).pipe(
      switchMap((dish) => dish[type]),
      filter((res: any ) => res.id === id)
    );
  }

  getDishByType(type: string) {
    return this.http.get(`${this.baseUrl}/restaurant`).pipe(
      map((dish) => type === 'all' ? dish : dish[type])
    );
  }

  addToRestaurantBasket(dishObject, count) {
    this.basket.set(dishObject.id, {count, dish: dishObject});
    this.restaurantBasket$.next(this.basket);
  }

  getMenuItems() {
    return [
      {
        name: 'Сніданки',
        type: 'breakfast'
      },
      {
        name: 'Брускети',
        type: 'bruskety'
      },
      {
        name: 'Салати',
        type: 'salads'
      },
      {
        name: 'Супи',
        type: 'soups'
      },
      {
        name: 'Спрінг-роли',
        type: 'spring-roll'
      },
      {
        name: 'Десерти',
        type: 'deserts'
      },
      {
        name: 'Напої',
        type: 'drinks'
      }
    ];
  }
}
