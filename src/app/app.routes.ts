import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { AdminUnlockComponent } from './pages/admin-unlock/admin-unlock.component';
import { AdminInsertComponent } from './pages/admin-insert/admin-insert.component';
import { AdminUpdateComponent } from './pages/admin-update/admin-update.component';

export const routes: Routes = [
    {
        path: "", 
        redirectTo: "home", 
        pathMatch: "full"
    },
    {
        path: "home", 
        component: HomeComponent
    },
    {
        path: "about", 
        component: AboutComponent
    },
    {
        path: "products", 
        component: ProductListComponent
    },
    {
        path: "products/:id", 
        component: ProductDetailsPageComponent
    },
    {
        path: "adminUnlock", 
        component: AdminUnlockComponent
    },
    {
        path: "adminDashboard", 
        component: AdminDashboardComponent, 
        canActivate: [adminGuard]
    },
    {
        path: "adminInsert", 
        component: AdminInsertComponent, 
        canActivate: [adminGuard]
    },
    { 
        path: 'adminUpdate/:id', 
        component: AdminUpdateComponent,
        canActivate: [adminGuard] 
    }

];
