import { LightningElement } from "lwc";
//import KnowledgeArticles from '@salesforce/apex/knowledgeSearchController.getKnowledgeArticles';



export default class App extends LightningElement {
  title = "Salseforce Knowledge search testing";

  showFeatures = true;

  /**
   * Getter for the features property
   */
  get features() {
    return [
      {
        label: "Learn in the browser.",
        icon: "utility:edit",
      },
      {
        label: "View changes to code instantly with Live Compilation.",
        icon: "utility:refresh",
      },
      {
        label: "Style your components with SLDS.",
        icon: "utility:brush",
      },
    ];
  }
}
