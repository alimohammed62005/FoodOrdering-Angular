import { TestBed } from '@angular/core/testing';

import { OrderItem } from './order-item';

describe('OrderItem', () => {
  let service: OrderItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
