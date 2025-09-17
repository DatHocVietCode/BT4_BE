const Fuse = require("fuse.js");

class ProductSearchUtils {
  /**
   * Fuzzy search + filter sản phẩm
   * @param {Array<Object>} products - Mảng sản phẩm
   * @param {Object} dto - SearchProductDto
   * @returns {Array<Object>} - Kết quả đã lọc và fuzzy search
   */
static search(products, dto = {}) {
    const {
      keyword,
      category,
      priceMin = 0,
      priceMax = Number.MAX_SAFE_INTEGER,
      discountMin = 0,
      viewsMin = 0,
      sortBy,
      sortOrder = "asc",
      
    } = dto;

    let results = products;
    
    // 1. Fuzzy search với Fuse.js nếu có keyword
    if (keyword) {
      const fuse = new Fuse(products, { keys: ["name"], threshold: 0.3 });
      results = fuse.search(keyword).map(r => r.item);
    }

    // 2. Filter theo các điều kiện khác
    results = results.filter(p => {
      const matchCategory = category ? p.category === category : true;
      const matchPrice = p.price >= priceMin && p.price <= priceMax;
      const matchDiscount = p.discount >= discountMin;
      const matchViews = p.views >= viewsMin;
      return matchCategory && matchPrice && matchDiscount && matchViews;
    });

    // 3. Sắp xếp nếu có sortBy
    if (sortBy) {
      results.sort((a, b) => {
        if (sortOrder === "asc") return a[sortBy] - b[sortBy];
        return b[sortBy] - a[sortBy];
      });
    }

    return results;
  }
}

module.exports = ProductSearchUtils;
