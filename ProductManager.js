const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async writeFile(datos) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(datos, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      let stock = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(stock);
    } catch (error) {
      console.log(error, "No hay datos en el archivo");
      return [];
    }
  }

  async addProduct(obj) {
    let stock = await this.getProducts();
    try {
      if (stock.length == 0) {
        obj.id = 1;
      } else {
        obj.id = stock[stock.length - 1].id + 1;
      }
      stock.push(obj);
      await this.writeFile(stock);
      console.log(`Se ha añadido correctamente ${JSON.stringify(obj)}`);
    } catch (error) {
      console.log(error, "No se ha guardado correctamente");
    }
  }

  async getProductById(id) {
    try {
      let stock = await this.getProducts();
      stock = stock.find((prod) => prod.id === id);
      function devolverId() {
        if (stock) {
          return stock;
        } else {
          return null;
        }
      }
      return devolverId();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let stock = await this.getProducts();
      stock = stock.filter((prod) => prod.id != id);
      await this.writeFile(stock);
      console.log(`Se ha eliminado el producto ${JSON.stringify(stock)}`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await this.writeFile([]);
    console.log(
      `Se han eliminado todos los productos del archivo: ${this.path}`
    );
  }

  async updateById(obj) {
    try {
      let stock = await this.getProducts();
      stock.map((prod) => {
        if (prod.id == obj.id) {
          (prod.title = obj.title),
            (prod.description = obj.description),
            (prod.price = obj.price),
            (prod.thumbnail = obj.thumbnail),
            (prod.code = obj.code),
            (prod.stock = obj.stock),
            (prod.brand = obj.brand);
        }
      });
      await this.writeFile(stock);
      return stock;
    } catch (error) {
      console.log(error);
    }
  }
}

/* PROCESO DE TESTING */
/* Crear instancia de prueba de la clase ProductManager */
const archivo = new ProductManager("productos.json");


async function prueba() {

/* Llamar a getProducts() tras crear la instancia, devolverá un array vacío */
  let get_all = await archivo.getProducts();
  console.log(get_all);

/* Llamar al método addProduct() con los campos correspondientes */
/* El objeto se agrega con un id generado automaticamente que no se repite */
  await archivo.addProduct({
    title: "Crema de manos Neroli & Orquideas",
    description:
      "Mantené la piel de tus manos nutrida, hidratada y fresca todo el día. La Manteca de Karité brindará antioxidantes superiores y beneficios extraordinarios para la piel de tus manos, mientras que la Vitamina E te aportará propiedades Humectantes y Regenerativas para tu piel. El Aceite de Macadamia le dará elasticidad y firmeza a tus manos y las dejará suaves y sedosas.",
    price: "$2000",
    thumbnail:
      "http://cdn.shopify.com/s/files/1/0079/0734/4497/products/semilla--flores-de-neroli-y-orquideas--crema-de-manos-frente.jpg?v=1632885626",
    code: "CM1",
    stock: "27",
    brand: "Semilla",
  });
  await archivo.addProduct({
    title: "Crema de cuerpo Neroli & Orquideas",
    description:
      "Mantené la piel de tu cuerpo nutrida, hidratada y fresca todo el día. La Manteca de Karité brindará antioxidantes superiores y beneficios extraordinarios para la piel de tu cuerpo, mientras que la Vitamina E te aportará propiedades Humectantes y Regenerativas para tu piel. El Aceite de Macadamia le dará elasticidad y firmeza a tu piel y las dejará suave y sedosa.",
    price: "$4500",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0079/0734/4497/products/NEROLI_ORQUIDEAS_FRENTE.jpg?v=1642535074&width=713",
    code: "CC2",
    stock: "32",
    brand: "Semilla",
  });
  await archivo.addProduct({
    title: "Esmalte Base Coat",
    description:
      "Alisa y protege tus uñas con nuestro Base Coat. Este producto es transparente incoloro, no blanquecino como se ve en la imagen. Sus ingredientes que favorecen la adhesión ayudan al pulido en la superficie de tus uñas para que no se astillen y las protege de manchas y alteraciones de color. Extiende el tiempo de duración de los esmaltes,  seca rápido y además agregamos un pincel Plano y Fino 100% Vegan y personalizado para una aplicación más simple.",
    price: "$1700",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0079/0734/4497/products/esmlate-base-coat-con-sombra.jpg?v=1661179331&width=713",
    code: "BC3",
    stock: "12",
    brand: "Semilla",
  });
  await archivo.addProduct({
    title: "Esmalte Top Coat",
    description:
      "Obtené un acabado superior y un aspecto con brillo en tus uñas. Otorgá mayor protección a tus colores. Extiende el tiempo de duración de los esmaltes,  seca rápido y además agregamos un pincel Big Brush Plano y fino 100% Vegan y personalizado para una aplicación más simple.",
    price: "$1700",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0079/0734/4497/products/esmalte-top-coat-sombra.jpg?v=1658169642&width=713",
    code: "TC4",
    stock: "23",
    brand: "Semilla",
  });
  await archivo.addProduct({
    title: "Agua Micelar",
    description:
      "Limpia, desmaquilla, previene irritaciones y suaviza tu piel gracias a los extractos de Manzanilla, Malva y Caléndula. Nuestra Agua Micelar forma Micelas que retienen el maquillaje o impurezas creando una piel más limpia y fresca.",
    price: "$2300",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0079/0734/4497/products/semilla1945-Copy.jpg?v=1671819070&width=713",
    code: "AM5",
    stock: "41",
    brand: "Semilla",
  });

/* Se llama al método getProducts() nuevamente, esta vez devuelve los productos recién añadidos */
  let get_all_two = await archivo.getProducts();
  console.log(get_all_two);

/* Se llama al método getProductById(), devuelve el producto con el id especificado  */
  let get_id = await archivo.getProductById(3);
  console.log(get_id);

/* Se llama al método updateProduct(), con el cual se modifican los campos de algún producto, sin eliminar el id  */
  await archivo.updateById({
    title: "Agua Micelar",
    description:
      "Limpia, desmaquilla, previene irritaciones y suaviza tu piel gracias a los extractos de Manzanilla, Malva y Caléndula. Nuestra Agua Micelar forma Micelas que retienen el maquillaje o impurezas creando una piel más limpia y fresca.",
    price: "$2300",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0079/0734/4497/products/semilla1945-Copy.jpg?v=1671819070&width=713",
    code: "AM5",
    stock: "41",
    brand: "Semilla",
    id: 1,
  });

/* Se llama al método deleteProduct(), el cual elimina el producto especificado por id */
  await archivo.deleteProduct(5);

/* Como un extra, creé el método deleteAll(), el cual elimina todos los productos del archivo */
  await archivo.deleteAll();

}

prueba();
