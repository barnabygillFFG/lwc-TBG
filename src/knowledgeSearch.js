import { LightningElement, track, wire, api } from 'lwc';
//import { testKnowledgeBase } from './knoweledgeBaseJSON.js';
//import { require } from ''; 
//import { NavigationMixin } from 'lightning/navigation';
//import KnowledgeArticles from '@salesforce/apex/knowledgeSearchController.getKnowledgeArticles';
//import assignArticleToCase from '@salesforce/apex/knowledgeSearchController.assignArticleToCase';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent'; // import toast message event .

//import * as data from './knowledgeBase.json';

const columns = [
    { label: 'caseID', fieldName: 'caseID' },
    { label: 'Title', fieldName: 'title' },
    { label: 'Content', fieldName: 'content' },
    { label: 'Tags', fieldName: '_tags' },
];

export default class KnowledgeSearch extends LightningElement {
    @track search;  
    //@track results;
    columns = columns;
    @track data = [];
    @api recordId;
    @track page;
    caseId;
    articles;
    @track recordSelected=false;
    @api selectedRow;
    @track articleSelected=false;
    @api selectedArticle;
    @track page = {}
    jsonRead;

    readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    
    readTextFile3(file) {
        var rawFile = new XMLHttpRequest();
        var allText; // var declared in readTextFile scope
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                console.log('here', rawFile.responseText)
                allText = rawFile.responseText;
            }
        }
        rawFile.send(null); 
        if (allText) {
            console.log('here2',allText)
            return allText;
        }
    }
    
    connectedCallback() {
        //window.alert(recordId)
        this.caseId=this.recordId;
        this.jsonRead = `[
                    {
                        "caseID": "1",
                        "title": "test article",
                        "url": "www.test.TBG.com",
                        "content" : "Articles are important for understanding information without having to contact a member of staff. This is a tet article.",
                        "tags": ["login", "FAQ"]
                    },
                    {
                        "caseID": "2",
                        "title": "second test article",
                        "url": "www.test2.TBG.com",
                        "content" : "This is also a test article.",
                        "tags": ["champion"]
                    },
                    {
                        "caseID": "3",
                        "title": "abcd in the title",
                        "url": "www.3.TBG.com",
                        "content" : "This is also a test article - number 3.",
                        "tags": ["login", "charity", "abc"]
                    },
                    {
                        "caseID": "4",
                        "title": "fourth",
                        "url": "www.number4.TBG.com",
                        "content" : "444 - This is also a test article.",
                        "tags": ["charity"]
                    },
                    {
                        "caseID": "5",
                        "title": "numero five",
                        "url": "www.555.TBG.com",
                        "content" : "Fifth article here.",
                        "tags": ["signup", "charity"]
                    },
                    {
                        "caseID": "6",
                        "title": "xxx",
                        "url": "www.6.TBG.com",
                        "content" : "abcd in the content",
                        "tags": ["matchfund"]
                    },
                    {
                        "caseID": "7",
                        "title": "abcdef in the title",
                        "url": "www.se7en.TBG.com",
                        "content" : "content",
                        "tags": ["charity", "abc"]
                    },
                    {
                        "caseID": "8",
                        "title": "Failing tags",
                        "url": "www.8.TBG.com",
                        "content" : "8",
                        "tags": "876"
                    }
                ]`;
        this.search = ""
        this.getRelevantArticles()
    }

    searchByTag(search) {
        this.search = search;
        console.log(this.search);

        this.articles = JSON.parse(this.jsonRead)

        this.data = this.getRelevantArticlesByTag();
    }


    changeHandler(event) {

        this.search = event.target.value;
        console.log(this.search);

        this.articles = JSON.parse(this.jsonRead)

        this.data = this.getRelevantArticles();

        /*
        this.articles = (this.readTextFile("./knowledgeBase.json", function(text) {
            //console.log(text);
            var search_data = JSON.parse(text);
            console.log(search_data);
            return search_data;
            //this.articles = JSON.parse(text);
            //console.log(this.articles);
        }));
        this.readTextFile("./knowledgeBase.json", function(text) {
            //console.log(text);
            var search_data = JSON.parse(text);
            console.log(search_data);
            this.articles = search_data;
            //this.articles = JSON.parse(text);
            //console.log(this.articles);
        });*/



        //this.articles = this.readTextFile3(filename)

        //console.log("articles: ", this.articles);
    }

    getArticles() {
        
        var search_data;
        this.readTextFile("./knowledgeBase.json", function(text) {
            //console.log(text);
            console.log(text)
            search_data = JSON.parse(text);
            
            //this.articles = search_data;
            //this.articles = JSON.parse(text);
            //console.log(this.articles);
        });
        console.log(search_data);
        return search_data;
    }

    getRelevantArticles() {
        
        //this.articles = this.readTextFile3('./knowledgeBase.json');
        //console.log('articles',this.articles);

        //console.log(this.jsonRead)


        /*
        this.articles = this.readTextFile('./knowledgeBase.json', function(text) {
            //this.articles = JSON.parse(text); //this.articles not in scope here
            console.log('text',text)
            var search_data = JSON.parse(text);
            console.log(search_data);
            return search_data
            //console.log(this.articles);
        });*/

        //this.articles = ()

        // search_data not in scope here



        //this.articles = JSON.parse(this.jsonRead)

        //this.articles = 
        //console.log('articles',this.articles);

        //var data = this.readFile('./knowledgeBase.json')
        //console.log(data);
        //this.articles = JSON.parse(data); //parse JSON

        //this.articles = JSON.parse(this.jsonRead); //this.findArticles();
        //console.log(this.articles);

        //var data = this.knowledeArticles;
        //console.log(this.knowledeArticles);

        

        //console.log(this.articles);

        /*filter(data) {
            this.articles = data;
            if (data) {
                var data_filter = this.articles.filter(element => element.title.includes(this.search))
                console.log(data_filter)
                //return data_filter
            }
        }*/
        
        if (this.articles) {

            this.articles = this.articles.filter( element =>
                    Array.isArray(element.tags)
                )
            
            this.articles.forEach((e, i, arr) => {
                console.log(this.articles[i])
                console.log(typeof(this.articles[i]))
                this.articles[i]._tags = e.tags.join(', ');
            });

            
            var data_filter_1 = this.articles.filter( element =>
                    element.title.toLowerCase().includes(this.search.toLowerCase())
                )

            var data_filter_2 = this.articles.filter( element =>
                    //typeof(element.tags)
                    element.tags.join('|').toLowerCase().includes(this.search.toLowerCase()) &&
                    !element.title.toLowerCase().includes(this.search.toLowerCase())
                )

            var data_filter_3 = this.articles.filter( element =>
                    element.content.toLowerCase().includes(this.search.toLowerCase()) &&
                    !element.tags.join('|').toLowerCase().includes(this.search.toLowerCase()) &&
                    !element.title.toLowerCase().includes(this.search.toLowerCase())
                )
            

            //var filter_articles = this.articles.filter( element =>
            //        element.title.toLowerCase().includes(this.search.toLowerCase()) ||
            //        element.tags.join('|').includes(this.search.toLowerCase()) ||
            //        element.content.toLowerCase().includes(this.search.toLowerCase())
            //    )
            
            var filtered_data = data_filter_1.concat(data_filter_2, data_filter_3)

            console.log(filtered_data)
            return filtered_data
        }
    }

    getRelevantArticlesByTag() {

        //this.articles = JSON.parse(this.jsonRead)
        
        if (this.articles) {

            this.articles = this.articles.filter( element =>
                    Array.isArray(element.tags)
                )
            
            this.articles.forEach((e, i, arr) => {
                console.log(this.articles[i])
                console.log(typeof(this.articles[i]))
                this.articles[i]._tags = e.tags.join(', ');
            });
            
            var filtered_data = this.articles.filter( element =>
                    element.tags.join('|').toLowerCase().includes(this.search.toLowerCase())
                )
            
            console.log(filtered_data)
            return filtered_data
        }
    }
 
    selectArticle = event => {
        console.log("hereeeee")
        //console.log(caseID)
        let id = event.currentTarget.dataset.id
        console.log(id)
        var article = this.getArticleFromID(id)
        console.log(article)
        console.log(article.title)
        console.log(article.tags)
        if (article) {
            this.selectedArticle = article;
            this.articleSelected = true;
        }

        //var article = event.currentTarget.dataset.id
        //console.log(article)

        //console.log(event.detail.value)
    }

    getArticleFromID(caseID) {
        if (this.articles) {
            return this.articles.find(x => x.caseID == caseID);
        }
    }


    /**/
    handleRowSelection = event => {
        console.log('handling')
        var selectedRows=event.detail.selectedRows;
        this.recordSelected=false;
        if(selectedRows.length>0)
        {  
            this.recordSelected=true;
        }
        console.log(selectedRows)
        this.selectedRow = selectedRows;

    }
    handleCancel= event => {
        this.recordSelected=false;
    }


    cardHover = event => {
        //console.log(component, event, helper)
        //console.log(component.find('3'))
        console.log(event.currentTarget)
        //var card = com
    }

    tagBtn(event) {
        let search = event.currentTarget.label
        this.searchByTag(search)
    }


}



/*
const columns = [
    {label: 'Title', fieldName: 'url', type: 'url',sortable : true,typeAttributes: {label: { fieldName: 'Title' }, target: '_self'}},
    { label: 'Question', fieldName: 'Question__c', type: 'text' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
    { label: 'Associated Cases', fieldName: 'ArticleCaseAttachCount', type: 'text' },
    { label: 'Total View', fieldName: 'ArticleTotalViewCount', type: 'text' },
];


export default class KnowledgeSearch extends LightningElement { //extends NavigationMixin(LightningElement) {
    @track article;  
    @track results;
    @track data = [];
    columns = columns;
    @api recordId;
    @track recordSelected=false;
    caseId;
    error;
    
    connectedCallback()
    {
        this.caseId=this.recordId;
    }

    @wire(KnowledgeArticles, {searchText : '$article'})
    wiredArticles({error, data}) {
        if (data) {
            this.articles = [];
            for (let article of data) {
                let myArticle = {};
                console.log('article:' + JSON.stringify(article));
                this.KnowledgePageRef = {
                    type: "standard__recordPage",
                    attributes: {
                        "recordId": article.Id,
                        "objectApiName": "Knowledge__kav",
                        "actionName": "view"
                    }
                };

                this[NavigationMixin.GenerateUrl](this.KnowledgePageRef)
                    .then(articleUrl => {
                        myArticle = {...article};
                        myArticle.url = articleUrl;
                        this.data = [...this.data, myArticle];
                    });
            }
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    changeHandler(event) {
        this.article = event.target.value;
        console.log('article', this.article);
    }
    assignFaqToCase = event => {
        var el = this.template.querySelector('lightning-datatable');
        var selectedRows = el.getSelectedRows();
        var caseArticles=[];
        for (let i = 0; i < selectedRows.length; i++){
            var caseArticle={
                "CaseId":this.caseId,
                "KnowledgeArticleId":selectedRows[i].KnowledgeArticleId
            };
            caseArticles.push(caseArticle);
        }

        assignArticleToCase({articles: caseArticles})
        .then((data,error) => {
            if (data) {
                this.error = undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        message: 'Case Associated Successfully',
                        variant: 'success',
                    }),
                );
            } else if (error) {
                this.error = error;
                console.log('Error:'+ JSON.stringify(error));
                this.dispatchEvent(
                new ShowToastEvent({
                    message: 'Error in Case Assiciation:' + error,
                    variant: 'error'
                }), );
            }
        });

    }
    handleRowSelection = event => {
        var selectedRows=event.detail.selectedRows;
        this.recordSelected=false;
        if(selectedRows.length>0)
        {  
            this.recordSelected=true;
        }
    }
    handleCancel= event => {
        this.recordSelected=false;
    }
}
*/



/* eslint-disable no-console */
/* eslint-disable no-alert 
import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';                             
export default class LightningNavSamples extends NavigationMixin(LightningElement) {
    @api recordId;
    navigateToNewRecordPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        });
    }
    navigateToEditRecordPage(){
        console.log('Record Id ==> '+ this.recordId);
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                "recordId":this.recordId,
                "objectApiName":"Account",
                "actionName": "edit"
            }
        });
    }
    navigateToViewRecordPage(){
        console.log('Record Id ==> '+ this.recordId);
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                "recordId":this.recordId,
                "objectApiName":"Account",
                "actionName": "view"
            }
        });
    }
}
*/


