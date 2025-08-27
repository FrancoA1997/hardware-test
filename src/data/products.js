
/* ------------------------------Imports---------------------------- */
//AMD
import ryzen7 from '../../public/assets/products/amd/amd_ryzen_7.png';
//Logitech
import logitech1 from '../../public/assets/products/logitech/headset/logitech_g_pro_x_1.png';
import logitech2 from '../../public/assets/products/logitech/headset/logitech_g_pro_x_2.png';
import logitech3 from '../../public/assets/products/logitech/headset/logitech_g_pro_x_3.png';
//Samsung
import samsung from '../../public/assets/products/samsung/monitor/samsung_odyssey_1.png';
import samsung2 from '../../public/assets/products/samsung/monitor/samsung_odyssey_2.png';

//Razer
import razer from '../../public/assets/products/razer/razer_deathadder_1.webp';
import razer2 from '../../public/assets/products/razer/razer_deathadder_2.webp';

//Intel
import intel from '../../public/assets/products/intel/intel_core_i9_12900K_1.png';

//Nvidia
import nvidia from '../../public/assets/products/nvidia/nvidia_geforce_rtx_3080.png';
//Kingstone
import kingston from '../../public/assets/products/kingstone/kingston_fury_beast.png';

//Corsair
import corsair from '../../public/assets/products/corsair/corsair_rm750_1.png';
import corsair2 from '../../public/assets/products/corsair/corsair_rm750_2.png';

//MSI
import msi from '../../public/assets/products/msi/msi_mpg_b550_1.png';  
import msi2 from '../../public/assets/products/msi/msi_mpg_b550_2.png';  

//Asus
import asus from '../../public/assets/products/asus/asus_rog_strix_x570_1.png';
import asus2 from '../../public/assets/products/asus/asus_rog_strix_x570_1.png';

//SteelSeries
import steelseries from '../../public/assets/products/steelseries/steelseries_apex_1.png';  
import steelseries2 from '../../public/assets/products/steelseries/steelseries_apex_2.png';

//HyperX
import hyperx from '../../public/assets/products/hyperx/hyperx_cloud_1.png';
import hyperx2 from '../../public/assets/products/hyperx/hyperx_cloud_2.png';

//Cooler Master
import cooler from '../../public/assets/products/coolermaster/cooler_master_hyper_1.webp';
import cooler2 from '../../public/assets/products/coolermaster/cooler_master_hyper_2.jpg';
/*---------------------------------------------------------------------- */

export const productsData = [

    {
      "id": 1,
      "productName": "Logitech G Pro X",
      "productPrice": 35000,
      "discountPercentage": 20,
      "categoryId": "Auriculares",
      "brandId": "Logitech",
      "thumbnail": logitech1,
      "gallery": {
        "images": [
          logitech2,
          logitech3
        ]
      },
      "featured": true,
      "productDescription": "Auriculares gamer con micrófono Blue Voice que ofrece una captura de voz de calidad profesional, ideal para streamers y jugadores competitivos. Incorpora controladores PRO-G de 50mm para un audio envolvente y preciso, con almohadillas de espuma viscoelástica para máxima comodidad en sesiones largas."
    },
    {
      "id": 2,
      "productName": "Samsung Odyssey G7",
      "productPrice": 48000,
      "discountPercentage": 30,
      "categoryId": "Monitores",
      "brandId": "Samsung",
      "thumbnail": samsung,
      "gallery": {
        "images": [
          samsung,
          samsung2
        ]
      },
      "featured": true,
      "productDescription": "Monitor curvo de 32 pulgadas con resolución QHD (2560x1440) y frecuencia de actualización de 240Hz, diseñado para gaming de alta velocidad. Incorpora tecnología Quantum Dot para una reproducción de color vibrante y compatibilidad con G-Sync y FreeSync Premium Pro."
    },
    {
      "id": 3,
      "productName": "Razer DeathAdder V2",
      "productPrice": 15000,
      "discountPercentage": 20,
      "categoryId": "Mouse",
      "brandId": "Razer",
      "thumbnail": razer,
      "gallery": {
        "images": [
          razer,
          razer2
        ]
      },
      "featured": false,
      "productDescription": "Mouse gamer ergonómico con sensor óptico Razer Focus+ de 20,000 DPI, diseñado para máxima precisión y velocidad. Equipado con switches ópticos Razer y cable Speedflex para movimientos sin resistencia. Ideal para esports y largas sesiones de juego."
    },
    {
      "id": 4,
      "productName": "Intel Core i9-12900K",
      "productPrice": 47000,
      "discountPercentage": 20,
      "categoryId": "Procesadores",
      "brandId": "Intel",
      "thumbnail": intel,
      "featured": true,
      "productDescription": "Procesador Intel Core i9 de 12ª generación con 16 núcleos y 24 hilos, diseñado para alto rendimiento en gaming y creación de contenido. Incluye arquitectura híbrida con núcleos de rendimiento y eficiencia, ideal para multitarea extrema y productividad profesional."
    },
    {
      "id": 5,
      "productName": "AMD Ryzen 7 5800X",
      "productPrice": 40000,
      "discountPercentage": 20,
      "categoryId": "Procesadores",
      "brandId": "AMD",
      "thumbnail": ryzen7,
      "gallery": {
        "images": [
          ryzen7
        ]
      },
      "featured": false,
      "productDescription": "Procesador AMD Ryzen 7 con 8 núcleos y 16 hilos, basado en arquitectura Zen 3. Ofrece un rendimiento excepcional para juegos y tareas pesadas, con un TDP de 105W y compatibilidad con PCIe 4.0."
    },
    {
      "id": 6,
      "productName": "NVIDIA GeForce RTX 3080",
      "productPrice": 50000,
      "discountPercentage": 20,
      "categoryId": "Placas de video",
      "brandId": "NVIDIA",
      "thumbnail": nvidia,
      "featured": true,
      "productDescription": "Tarjeta gráfica de alto rendimiento con 10GB de memoria GDDR6X, ideal para gaming 4K y renderizado avanzado. Soporta trazado de rayos en tiempo real y DLSS, optimizando el rendimiento en juegos modernos."
    },
    {
      "id": 7,
      "productName": "Kingston Fury Beast 16GB",
      "productPrice": 12000,
      "discountPercentage": 10,
      "categoryId": "Memoria ram",
      "brandId": "Kingston",
      "thumbnail": kingston,
      "featured": false,
      "productDescription": "Memoria RAM DDR4 de 16GB con velocidad de 3200MHz, ideal para gaming y tareas multitarea. Compatible con perfiles XMP y diseñada para overclocking estable."
    },
    {
      "id": 8,
      "productName": "Corsair RM750x",
      "productPrice": 20000,
      "discountPercentage": 20,
      "categoryId": "Fuentes",
      "brandId": "Corsair",
      "thumbnail": corsair,
      "gallery": {
        "images": [
          corsair,
          corsair2
        ]
      },
      "featured": false,
      "productDescription": "Fuente de alimentación de 750W, certificación Gold."
    },
    {
      "id": 9,
      "productName": "MSI MPG B550 Gaming Plus",
      "productPrice": 25000,
      "discountPercentage": 20,
      "categoryId": "Motherboards",
      "brandId": "MSI",
      "thumbnail": msi,
      "gallery": {
        "images": [
          msi,
          msi2
        ]
      },
      "featured": true,
      "productDescription": "Motherboard AM4 con PCIe 4.0 y Mystic Light."
    },
    {
      "id": 10,
      "productName": "Asus ROG Strix X570-E",
      "productPrice": 30000,
      "discountPercentage": 20,
      "categoryId": "Motherboards",
      "brandId": "Asus",
      "thumbnail": asus,
      "gallery": {
        "images": [
          asus,
          asus2
        ]
      },
      "featured": true,
      "productDescription": "Motherboard premium para Ryzen con RGB Aura Sync."
    },
    {
      "id": 11,
      "productName": "SteelSeries Apex Pro",
      "productPrice": 38000,
      "discountPercentage": 30,
      "categoryId": "Teclados",
      "brandId": "SteelSeries",
      "thumbnail": steelseries,
      "gallery": {
        "images": [
          steelseries,
          steelseries2
        ]
      },
      "featured": true,
      "productDescription": "Teclado mecánico con switches ajustables."
    },
    {
      "id": 12,
      "productName": "HyperX Cloud II",
      "productPrice": 30000,
      "discountPercentage": 20,
      "categoryId": "Auriculares",
      "brandId": "HyperX",
      "thumbnail": hyperx,
      "gallery": {
        "images": [
          hyperx,
          hyperx2
        ]
      },
      "featured": false,
      "productDescription": "Auriculares con sonido envolvente 7.1 virtual."
    },
    {
      "id": 13,
      "productName": "Cooler Master Hyper 212",
      "productPrice": 10000,
      "discountPercentage": 20,
      "categoryId": "Coolers",
      "brandId": "Cooler Master",
      "thumbnail": cooler,
      "gallery": {
        "images": [
          cooler,
          cooler2
        ]
      },
      "featured": false,
      "productDescription": "Disipador de aire para CPU con ventilador silencioso."
    }
  ]
  