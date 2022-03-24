import { LightningElement, track, wire, api } from 'lwc';
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
    caseId;
    articles;
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
                        "content" : "This is also a text article."
                    },
                    {
                        "caseID": "3",
                        "title": "abcd",
                        "url": "www.3.TBG.com",
                        "content" : "This is also a text article - number 3."
                    }
                    ,
                    {
                        "caseID": "4",
                        "title": "fourth",
                        "url": "www.number4.TBG.com",
                        "content" : "444 - This is also a text article."
                    }
                ]`;

    //knowledge = require('./knowledgeBase.json');
    //console.log(knowledge);

    //findArticles() {
    //    fetch('./knowledgeBase.json')
    //    .then(response => {
    //        return response.json();
    //    })
        //.then(data => console.log(data));
        //return response.json();
    //}


    connectedCallback() {
        //window.alert(recordId)
        this.caseId=this.recordId;
    }

    changeHandler(event) {
        this.search = event.target.value;
        console.log(this.search);
        this.data = this.getRelevantArticles();
    }

    getRelevantArticles() {
        this.articles = JSON.parse(this.jsonRead); //this.findArticles();
        //this.columns = Object.keys(this.articles[0]);
        //console.log(Object.keys(this.articles[0]));
        var data_filter = this.articles.filter( element => element.title.includes(this.search))
        console.log(data_filter)
        return data_filter
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


