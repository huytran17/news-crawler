import { SiteType, Domain, Category } from "../enums";

const crawl_data = {
  [SiteType.VNEXPRESS]: {
    domain: Domain.VNEXPRESS,
    pages: [
      {
        category: Category.SUC_KHOE,
        sub_categories: [
          Category.TIN_TUC,
          Category.TU_VAN,
          Category.DINH_DUONG,
          Category.KHOE_DEP,
        ],
      },
    ],
  },
};

export { crawl_data };
