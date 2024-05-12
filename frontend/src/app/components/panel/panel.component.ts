import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  providers: [CarService]
})
export class PanelComponent implements OnInit {
  carBrandForm: FormGroup;
  carModelForm: FormGroup;
  carForm: FormGroup;
  carBrands: any[] = [];
  carModels: any[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.carBrandForm = this.fb.group({
      name: ''
    });
    this.carModelForm = this.fb.group({
      name: '',
      carBrandId: ''
    });
    this.carForm = this.fb.group({
      color: '',
      year: '',
      kilometers: '',
      price: '',
      carModelId: '',
      image: [''],
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit(): void {
    this.loadCarBrands();
    this.loadCarModels();
  }

  loadCarBrands() {
    this.carService.getCarBrands().subscribe({
      next: (brands) => this.carBrands = brands,
      error: (err) => console.error('Грешка при зареждането на марките!', err)
    });
  }

  loadCarModels() {
    this.carService.getCarModels().subscribe({
      next: (models) => this.carModels = models,
      error: (err) => console.error('Грешка при зареждането на моделите!', err)
    });
  }

  createCarBrand(): void {
    this.carService.createCarBrand(this.carBrandForm.value).subscribe({
      next: () => {
        alert('Успешно добавена марка!');
        this.loadCarBrands();
        this.carBrandForm.reset(); 
      },
      error: (err) => alert('Грешка при добавянето на марка!')
    });
  }

  createCarModel(): void {
    this.carService.createCarModel(this.carModelForm.value).subscribe({
      next: () => {
        alert('Успешно добавен модел!');
        this.loadCarModels(); 
        this.carModelForm.reset();
      },
      error: (err) => alert('Грешка при добавянето на модел!')
    });
  }

  uploadCar(): void {
    const formData = new FormData();
    formData.append('color', this.carForm.value.color);
    formData.append('year', this.carForm.value.year);
    formData.append('kilometers', this.carForm.value.kilometers);
    formData.append('price', this.carForm.value.price);
    formData.append('carModelId', this.carForm.value.carModelId);
    formData.append('file', this.selectedFile ?? '');  

    this.carService.createCarWithImage(formData).subscribe({
      next: () => {
        alert('Успешно добавен автомобил!');
        this.carForm.reset();
      },
      error: (err) => alert('Грешка при добавянето на автомобил')
    });
  }
}
