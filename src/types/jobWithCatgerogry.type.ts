import JobCategoryEntity from "./jobCategoryEntity.type";
import JobEntity from "./jobEntity.type";

export default interface JobWithCategory {
    jobs?: any | JobEntity,
    categories?: any | JobCategoryEntity

}