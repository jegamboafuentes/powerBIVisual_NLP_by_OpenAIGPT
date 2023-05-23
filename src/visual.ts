/*
JEGF
*/
"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";
//import "../assets/logo.png"

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

import * as config from "../config.json";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private textNode: Text;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private dataView: powerbi.DataView;


    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.updateCount = 0;
        if (document) {
            const new_p: HTMLElement = document.createElement("p");
            new_p.appendChild(document.createTextNode("Update count:"));
            const new_em: HTMLElement = document.createElement("em");
            this.textNode = document.createTextNode(this.updateCount.toString());
            new_em.appendChild(this.textNode);
            new_p.appendChild(new_em);
            this.target.appendChild(new_p);
        }
    }

    public update(options: VisualUpdateOptions) {
        this.dataView = options.dataViews[0];
        console.log(this.dataView);
        this.target.innerHTML = `
        <div>
            <h1>🔍 NLP Analysis tool</h1>
            <h3>Ask questions about data</h3>
            <h6>Powered by OpenAI GPT API ⚡</h6>
            <textarea id="gptQuestionInput" type="text" placeholder="Ask a question about the data" /></textarea>
            <br>
            <button id="gptSubmitButton">Submit</button>
            <div id="gptResponse">🤖</div>
            <div id="UGXlogo" ></div>
        </div>
    `;

        const input = document.getElementById("gptQuestionInput");
        const submitButton = document.getElementById("gptSubmitButton");
        const responseDisplay = document.getElementById("gptResponse");

        submitButton.addEventListener("click", async () => {
            const question = (input as HTMLInputElement).value;
            const response = await this.getGptResponse(question);
            responseDisplay.innerHTML = response;
        });
    }


    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

    private async getGptResponse(question: string): Promise<string> {
        const apiKey = config.OPENAI_API_KEY;
        const apiUrl = "https://api.openai.com/v1/completions";
        const model = "text-davinci-003";
        const prompt = `You are a Data Analyst that gives short answer questions about data.\n Question:${question}\n Dataset: ${this.formatDataForGpt()}\n\n Answer:`;
        console.log(prompt);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                prompt,
                max_tokens: 50,
                n: 1,
                stop: null,
                temperature: 0.5
            })
        });

        const data = await response.json();
        console.log(data);
        return data.choices[0].text.trim();
    }


    private formatDataForGpt(): string {
        if (!this.dataView) {
            return "No data available";
        }
        const maxRows = 50;
        const categories = this.dataView.categorical.categories;
        const values = this.dataView.categorical.values;

        const categoryColumns = categories.map(category => category.source.displayName);
        const valueColumns = values.map(value => value.source.displayName);
        const columns = categoryColumns.concat(valueColumns);
        //const rowCount = categories[0].values.length;
        const rowCount = Math.min(categories[0].values.length, maxRows);

        let formattedData = columns.join(", ") + "\n";

        for (let i = 0; i <= rowCount; i++) {
            const categoryRow = categories.map(category => category.values[i]);
            const valueRow = values.map(value => value.values[i]);
            const row = categoryRow.concat(valueRow);
            formattedData += row.join(", ") + "\n";
        }

        return formattedData;
    }





}