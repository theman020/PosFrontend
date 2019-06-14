import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../models/product";
import { ProductListingService } from "../services/product-listing.service";
import { CustomersService } from "../services/customers.service";
import { CartService } from "../services/cart.service";
import { CartDetails } from "../models/cart-details";
import { Cart } from "../models/cart";
import { Customer } from "../models/customer";
import { ToastrService } from "../services/toastr.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-product-listing",
  templateUrl: "./product-listing.component.html",
  styleUrls: ["./product-listing.component.css"]
})
export class ProductListingComponent implements OnInit {
  products: Array<Product>;
  customer: Customer
  @Input() cart: Cart;
  @Output() result = new EventEmitter<Cart>();

  constructor(
    private productListingService: ProductListingService,
    private customerService: CustomersService,
    private cartService: CartService,
    private toastr: ToastrService, private router: Router
  ) { }


  ngOnInit() {
    if (!JSON.parse(localStorage.getItem("activeEmployee"))) {
      this.router.navigate([''])
    }
    this.getAllProducts();
  }



  getAllProducts() {
    this.productListingService.getProducts().subscribe(data => {
      this.products = data;
    }, error => {
      this.toastr.error(error.errorMessage)
    });
  }

  addToCart(productId) {
    // if(!isInStock(productId))
    // this.toastr.info("Cannot add Item")
    //else {
    this.cartService.addProductToCart(productId, this.cart.id).subscribe(data => {
      this.cart = data;
      this.result.emit(this.cart);
      localStorage.setItem("activeCart", JSON.stringify(data));
      this.cartService.getSubtotal(this.cart)
    }, error => {
      this.toastr.error(error.errorMessage)
    });
    // }
  }

  searchProducts(searchBy) {
    this.productListingService.searchProducts(searchBy).subscribe(data => {
      this.products = data;
    }, error => {
      this.toastr.error(error.errorMessage)
    });
  }

  isInStock(productId) {

  }

  getStock(productId) {
    for (let product of this.products) {
      if (product.id == productId) {
        return product.stock;
      }
    }
  }


}


