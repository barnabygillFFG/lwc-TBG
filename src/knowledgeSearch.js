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
    { label: 'url', fieldName: 'url', type: 'url' },
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
    /**/
    //@track knowledeArticles = testKnowledgeBase();
    /*
    jsonRead = `[
                    {
                        "caseID": "1",
                        "title": "test article",
                        "url": "www.test.TBG.com",
                        "content" : "Articles are important for understanding information without having to contact a member of staff. This is a tet article."
                    },
                    {
                        "caseID": "2",
                        "title": "second test article",
                        "url": "www.test2.TBG.com",
                        "content" : "This is also a test article."
                    },
                    {
                        "caseID": "3",
                        "title": "abcd",
                        "url": "www.3.TBG.com",
                        "content" : "This is also a test article - number 3."
                    },
                    {
                        "caseID": "4",
                        "title": "fourth",
                        "url": "www.number4.TBG.com",
                        "content" : "444 - This is also a test article."
                    },
                    {
                        "caseID": "5",
                        "title": "numero five",
                        "url": "www.555.TBG.com",
                        "content" : "Fifth article here."
                    }
                ]`;
    */

    //knowledge = require('./knowledgeBase.json');
    //console.log(knowledge);

    /*findArticles() {
        fetch('./knowledgeBase.json')
        .then(response => {
            return response.json();
        })
        .then(data => console.log(data));
        return response.json();
    }

    readFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                windown.alert(rawFile.responseText)
                return rawFile.responseText;
            }
        }
        //return null;
    }*/

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
                allText = rawFile.responseText;
            }
        }
        rawFile.send(null);
        console.log(allText)
        return allText;
    }

    readTextFile2(file) {
        var rawFile = new XMLHttpRequest();
        var allText; // var declared in readTextFile scope
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        console.log(allText)
        return allText; // here you can return the data filled in above
    }

    /*download_KB(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }*/


    connectedCallback() {
        //window.alert(recordId)
        this.caseId=this.recordId;
    }

    changeHandler(event) {
        this.search = event.target.value;
        console.log(this.search);

        this.data = this.getRelevantArticles();

        /*var filename = "./knowledgeBase.json"
        this.articles = (function(filename) {
            var search_data;
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", filename, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    search_data = JSON.parse(rawFile.responseText);
                }
            }
            rawFile.send(null);
            //var search_data = JSON.parse(text);
            console.log(search_data);
            return search_data;
            //this.articles = JSON.parse(text);
            //console.log(this.articles);
        });
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
            search_data = JSON.parse(text);
            
            //this.articles = search_data;
            //this.articles = JSON.parse(text);
            //console.log(this.articles);
        });
        console.log(search_data);
        return search_data;
    }


    //async 
    getRelevantArticles() {
        
        //this.articles = this.readTextFile('./knowledgeBase.json', function(text) {
        //    //this.articles = JSON.parse(text); //parse JSON
        //    var search_data = JSON.parse(text);
        //    console.log(search_data);
        //    return search_data
        //    //console.log(this.articles);
        //});

        this.readTextFile("./knowledgeBase.json", function(text){
            //var data =
            this.articles = JSON.parse(text);
            console.log(data);
        });

        //this.articles = 
        console.log(this.articles);

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
            //this.columns = Object.keys(this.articles[0]);
            //console.log(Object.keys(this.articles[0]));
            var data_filter = this.articles.filter(element => element.title.includes(this.search))
            console.log(data_filter)
            return data_filter
        }
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


