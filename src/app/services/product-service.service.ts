import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      imageUrl: 'assets/images/iphone15Pro/iphone15ProMain.jpg',
      price: 1199,
      description: 'The most powerful iPhone yet with an A17 chip.',
      specs: {
        chipset: 'Apple A17 Pro',
        display: '6.1″ Super Retina XDR OLED, ProMotion 120Hz',
        build: 'Titanium frame',
        camera: 'Triple 48MP + 12MP + 12MP (telephoto)',
        frontCamera: '12MP TrueDepth',
        battery: '~3200 mAh (est.)',
        charging: 'USB-C, MagSafe, 20W fast charging',
        os: 'iOS 17',
      },
      images: [
        "assets/images/iphone15Pro/iphone15ProModel.jpg",
        "assets/images/iphone15Pro/iphone15ProCamera.jpg",
        "assets/images/iphone15Pro/iphone15ProTable.jpg"
      ]
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      imageUrl: 'assets/images/s24Main.jpg',
      price: 1099,
      description: 'Flagship Samsung phone with high-res AMOLED display.',
      specs: {
        chipset: 'Snapdragon 8 Gen 3 / Exynos 2400 (region-dependent)',
        display: '6.1″ AMOLED 120Hz',
        camera: 'Triple 50MP + 12MP + 10MP (telephoto)',
        frontCamera: '12MP',
        battery: '4000 mAh',
        charging: 'USB-C, 25W fast charging',
        os: 'Android 14 (One UI 6)',
        build: ''
      }
    },
    {
      id: 3,
      name: 'Google Pixel 8',
      imageUrl: 'assets/images/pixel8Main.webp',
      price: 999,
      description: 'Clean Android experience with Google Tensor chip.',
      specs: {
        chipset: 'Google Tensor G3',
        display: '6.2″ OLED, 120Hz',
        camera: 'Dual 50MP wide + 12MP ultra-wide',
        frontCamera: '10.5MP',
        battery: '4575 mAh',
        charging: 'USB-C, 27W wired, 18W wireless',
        os: 'Android 14',
        build: ''
      }
    },
    {
      id: 4,
      name: 'iPhone 15',
      imageUrl: 'assets/images/iphone15/iphone15Main.png',
      price: 899,
      description: 'The latest iPhone with USB-C, Dynamic Island, and a sleek new design.',
      specs: {
        chipset: 'Apple A16 Bionic',
        display: '6.1″ Super Retina XDR OLED',
        camera: 'Dual 48MP + 12MP',
        frontCamera: '12MP TrueDepth',
        battery: '~3349 mAh',
        charging: 'USB-C, 20W fast charging',
        os: 'iOS 17',
        build: ''
      },
      images: [
        "assets/images/iphone15/iphone15Notch.jpg",
        "assets/images/iphone15/iphone15Camera.jpg",
        "assets/images/iphone15/iphone15Table.jpg"
      ]
    },
    {
      id: 5,
      name: 'Samsung Galaxy S22 Ultra',
      imageUrl: 'assets/images/s22UltraMain.webp',
      price: 1199,
      description: 'Flagship Samsung phone with a built-in S Pen, stunning AMOLED display, and a 108MP camera.',
      specs: {
        chipset: 'Snapdragon 8 Gen 1 / Exynos 2200',
        display: '6.8″ QHD+ AMOLED, 120Hz',
        camera: 'Quad 108MP + 10MP + 10MP + 12MP',
        frontCamera: '40MP',
        battery: '5000 mAh',
        charging: 'USB-C, 45W wired',
        extras: 'S Pen built-in',
        os: 'Android 12 (upgradable to Android 14)',
        build: ''
      }
    },
    {
      id: 6,
      name: 'iPhone XS Max',
      imageUrl: 'assets/images/iphoneXsMax/iphoneXsMaxMain.png',
      price: 599,
      description: 'A classic from Apple with a 6.5-inch OLED display and powerful A12 Bionic chip.',
      specs: {
        chipset: 'Apple A12 Bionic',
        display: '6.5″ Super Retina OLED',
        camera: 'Dual 12MP + 12MP (telephoto)',
        frontCamera: '7MP',
        battery: '3174 mAh',
        charging: 'Lightning port, 15W fast charging',
        os: 'Originally iOS 12 (upgradable to iOS 16)',
        build: ''
      },
      images: [
        "assets/images/iphoneXsMax/iphoneXsMaxBack.jpg",
        "assets/images/iphoneXsMax/iphoneXsMaxHands.jpg"
      ]
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
