import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CarsComponent } from './components/cars/cars.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarViewComponent } from './components/cars/car-view/car-view.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'cars', component: CarsComponent},
    {path: 'cars/:id', component: CarViewComponent},
    {path: 'contact', component: ContactComponent},
];
