// احنا مسكنا العناصر دي خارج الفاانكشن (عشان اولا تكون موجودة دايما في ملف الجافا سكريب) (وتاني حاجة لو عرفتها داخل الفانكشن .. كل مرة هعمل كول للفانكشن .. الفانكشن هتروح ملف الاتش تي ام ال تدور علي العناصر دي وتمسكهاودا هيقلل الأداء )

// عرفناها كلها ف الاول عشان كل الفانكشن تقدر تستخدمها 

var nameInput = document.getElementById('productName');
var categoryInput = document.getElementById('prouductCategory');
var priceInput = document.getElementById('productPrice');
var descriptionInput = document.getElementById('productDescription');

var searchInput = document.getElementById('searchInput');

var tbody = document.getElementById('tbody');

var addBtn = document.getElementById('addBtn');
//  var allProduct =[] ;  // clear array every time u refresh the page

if(localStorage.getItem('ProductsData') !== null ){
    var allProduct = JSON.parse(localStorage.getItem('ProductsData'));
        displayTable();
} else{
    var allProduct = [];
}








// var allProduct = JSON.parse(localStorage.getItem('ProductsData'));
// console.log(allProduct)                                           
 
//displayTable();

function createProduct(){
 
    if (addBtn.innerHTML == 'Add Product'){
    var product = {
        productName : nameInput.value,
        productCategory : categoryInput.value,
        productPrice : priceInput.value,
        productDescription : descriptionInput.value
    } ;

    // لو حطيت السطر دا هنا .. معناه ان كل مرة اعمل كليك (فضي الليست)  .. فلازم اعرفه برة الفانكشن local variable
    // عشان ممكن احتاج استعملها مع كذا فانكشن ممكن في التعديل او المسح 
    // var allProduct = [];    

    allProduct.push(product);
    

    var stringData= JSON.stringify(allProduct);               // convert array of object to string
   // console.log(stringData)

    localStorage.setItem("ProductsData", stringData);
    // console.log(product);
    // console.log(allProduct);


   // ممكن الفانكشن دي لما اشغلها تضيف المنتج و تفضي الفورم createProduct()
   // clearForm() 
  
   // لما اضغط علي الزرار و اضيف منتج .. جملة الكول دي هتخلي المنتج يظهر ف الجدول
   retriveProduct();   

}

else{

    updateProduct()
};
   


} 






function clearForm(){

    nameInput.value = "" ;
    categoryInput.value = "" ;
    priceInput.value = "";
    descriptionInput.value = "" ;
} ;





function displayTable(){

    trs = "";

    for(i=0 ; i < allProduct.length ; i++){ 
 
          trs +=  `<tr>                                              
             <td>${i +1 }</td>
             <td>${allProduct[i].productName}</td>
             <td>${allProduct[i].productCategory}</td>
             <td>${allProduct[i].productPrice}</td>
             <td>${allProduct[i].productDescription}</td> 
             <td>
                 <button class="btn btn-warning" onclick='retriveProductInForm(${i})'>
                     <i class="fa-solid fa-pen-to-square"></i>
                 </button>
             </td>
             <td>
                 <button class="btn btn-danger" onclick="deleteProduct(${i})">
                     <i class="fa-solid fa-trash"></i>
                 </button>
             </td>
         </tr>` ;
     
     }

     tbody.innerHTML= trs ;
      
 }




//var tbody = document.getElementById('tbody') ;

// في البداية فقط بتكون فاضية 
//  لو حطيتها دا الفانكشن كل مرة هدخل منتج هيمسح اللي فيه وبعدين يضيف المنتج الجديد بس
var trs = "";

function retriveProduct(){
   
    lastIndex = allProduct.length - 1 ;

    trs =         
            `<tr>                                              
            <td>${allProduct.length }</td>
            <td>${allProduct[lastIndex].productName}</td>
            <td>${allProduct[lastIndex].productCategory}</td>
            <td>${allProduct[lastIndex].productPrice}</td>
            <td>${allProduct[lastIndex].productDescription}</td>
            <td>
                <button class="btn btn-warning">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>` ;

        tbody.innerHTML += trs ;

        displayTable();

};







function searchProduct(searchWord){
   trs = "";
    var searchWord = searchInput.value;

    for(var i = 0 ; i<allProduct.length ; i++ ){
        if(allProduct[i].productName.toLowerCase().startsWith(searchWord.toLowerCase())){
           
            trs +=  `<tr>                                              
            <td>${i}</td>
            <td>${allProduct[i].productName}</td>
            <td>${allProduct[i].productCategory}</td>
            <td>${allProduct[i].productPrice}</td>
            <td>${allProduct[i].productDescription}</td> 
            <td>
                <button class="btn btn-warning">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>` ;
        }

        tbody.innerHTML=trs;
    
    }
}




function deleteProduct(indexOf){
    allProduct.splice(indexOf , 1) ;
    localStorage.setItem('ProductsData' , JSON.stringify(allProduct) ) ;
    displayTable();
}







var index ;

function retriveProductInForm(indexOf){
     
    index = indexOf ; 

    addBtn.innerHTML='update';

    nameInput.value = allProduct[index].productName;
    categoryInput.value = allProduct[index].productCategory;
    priceInput.value = allProduct[index].productPrice;
    descriptionInput.value = allProduct[index].productDescription;

   

}


function updateProduct(){

    allProduct[index].productName = nameInput.value ;
    allProduct[index].productCategory = categoryInput.value ;
    allProduct[index].productPrice = priceInput.value ;
    allProduct[index].productDescription = descriptionInput.value ;
   
    allProduct.splice(index , 1 , allProduct[index])
    localStorage.setItem('ProductsData' , JSON.stringify(allProduct) )
    addBtn.innerHTML = 'Add Product';

    displayTable()

}