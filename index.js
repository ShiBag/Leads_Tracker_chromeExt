let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        myLeads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myleads",JSON.stringify(myLeads))
  inputEl.value = null;
  render(myLeads);
});

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads);
})

function render(leads) {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    listItems += `<li> 
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

