import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema(
    {
        Category_name:String
    },
)
const Category = mongoose.model("Category",CategoriesSchema)
export default Category