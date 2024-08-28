import 'core-js/es/array/find';
interface Product {
    sku: string;
    name: string;
    price: number;
  }
  
interface PricingRule {
    apply: (items: Product[]) => number;
  }
  
const productsCatalogue: Product[] = [
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
    { sku: "atv", name: "Apple TV", price: 109.50 },
    { sku: "vga", name: "VGA adapter", price: 30.00 }
  ];
  console.log("Hello",Array.isArray(productsCatalogue));
  class AppleTVPricingRule implements PricingRule {
    apply(items: Product[]): number {
      const appleTVs = items.filter(item => item.sku === "atv");
      const fullPriceCount = appleTVs.length - Math.floor(appleTVs.length / 3);
      const appleTVProduct = productsCatalogue.find(p => p.sku === "atv");
      if (!appleTVProduct) {
        throw new Error("Apple TV product not found in the catalogue");
      }
      return fullPriceCount * appleTVProduct.price;
    }
  }
  
  class SuperIPadPricingRule implements PricingRule {
    apply(items: Product[]): number {
      const iPads = items.filter(item => item.sku === "ipd");
      if (iPads.length > 4) {
        return iPads.length * 499.99;
      } else {
        return iPads.length * productsCatalogue.find(p => p.sku === "ipd")!.price;
      }
    }
  }

  class Checkout {
    private items: Product[] = [];
    private pricingRules: PricingRule[];
  
    constructor(pricingRules: PricingRule[]) {
      this.pricingRules = pricingRules;
    }
  
    scan(sku: string): void {
      const product = productsCatalogue.find(p => p.sku === sku);
      if (product) {
        this.items.push(product);
      }
    }
  
    total(): number {
      let total = 0;
      const appliedItems = [...this.items];
      
      for (const rule of this.pricingRules) {
        total += rule.apply(appliedItems);
        appliedItems.splice(0, appliedItems.length);
      }
  
      for (const item of appliedItems) {
        total += item.price;
      }
  
      return total;
    }
  }

  const pricingRules: PricingRule[] = [
    new AppleTVPricingRule(),
    new SuperIPadPricingRule()
  ];
  
  const co = new Checkout(pricingRules);
  co.scan("atv");
  co.scan("atv");
  co.scan("atv");
  co.scan("vga");
  console.log(co.total());
  
  const co2 = new Checkout(pricingRules);
  co2.scan("atv");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("atv");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("ipd");
  console.log(co2.total());
  