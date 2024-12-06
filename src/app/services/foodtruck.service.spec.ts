import { TestBed } from '@angular/core/testing';

import { FoodtruckService } from './foodtruck.service';
import {FoodTruck} from "../interfaces/foodTruck";
import {v4 as uuidv4} from "uuid";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('FoodtruckService', () => {
  let service: FoodtruckService;
  let httpMock: HttpTestingController;
  const mockFoodTruck: FoodTruck = {
    foodTruckId: uuidv4(),
    name: 'The Burger Truck',
    locationId: 'LOC01',
    locationName: 'Downtown Plaza',
    editionId: 'ED01',
    editionName: 'Summer Festival 2023',
    menuItems: [
    ],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodtruckService]
    });
    service = TestBed.inject(FoodtruckService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch food trucks', () => {
    const mockFoodTrucks: FoodTruck[] = [mockFoodTruck];

    service.getFoodtrucks().subscribe((foodTrucks) => {
      expect(foodTrucks).toEqual(mockFoodTrucks);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodTrucks);
  });

  it('should fetch a food truck by ID', () => {
    service.getFoodtruckById(mockFoodTruck.foodTruckId).subscribe((foodTruck) => {
      expect(foodTruck).toEqual(mockFoodTruck);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockFoodTruck.foodTruckId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodTruck);
  })

  it('should add a food truck', () => {
    service.postFoodtruck(mockFoodTruck).subscribe((foodTruck) => {
      expect(foodTruck).toEqual(mockFoodTruck);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.foodTruckId).toBeTruthy(); // Ensures the UUID is set
    req.flush(mockFoodTruck);

  });

  it('should update a food truck', () => {
    const updatedFoodTruck = {...mockFoodTruck, name: 'Updated Burger Truck'};

    service.putFoodtruck(mockFoodTruck.foodTruckId, updatedFoodTruck).subscribe((foodTruck) => {
      expect(foodTruck).toEqual(updatedFoodTruck);
    })

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockFoodTruck.foodTruckId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedFoodTruck);
    req.flush(updatedFoodTruck);
  });

  it('should delete a food truck', () => {
    service.deleteFoodtruck(mockFoodTruck.foodTruckId).subscribe((response) => {
      expect(response).toBeFalsy(); // Expecting no response content on delete
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockFoodTruck.foodTruckId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
