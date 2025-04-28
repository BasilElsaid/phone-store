import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "about", component: AboutComponent},
    {path: "products", component: ProductListComponent},
    {path: "products/:id", component: ProductDetailsPageComponent},
];
