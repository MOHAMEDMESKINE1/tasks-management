import Api from "../../helpers/Api";

const   useCategories =  () => {
 
    try {
        const categories = Api.get('categories').then(res => res.data);

        return categories;
    } catch (error) {
        console.log(error);
    }
}

export default useCategories;