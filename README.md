# PowerBI Custom Visual - NLP by OpenAI GPT 📈💬

Welcome to the PowerBI custom visual that creates NLP (Natural Language Processing) analysis for the data on your dashboards! This project is designed to enhance your PowerBI dashboards by using NLP analysis from OpenAI's GPT to understand your data. Now you can ask questions about your data and get intelligent and insightful answers! 💡

## How to Install and Make Changes 🔧

Follow these steps to install the custom visual and make changes as desired:

### 1. Download the Repository 📥

Make sure you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed locally and run the following command:

```bash
git clone https://github.com/jegamboafuentes/powerBIVisual_NLP_by_OpenAIGPT
```

Navigate to the project directory:

```bash
cd powerBIVisual_NLP_by_OpenAIGPT
```

### 2. Create a config.json file 🗒️

Create a `config.json` file in the project directory with the following code:

```json
{
  "OPENAI_API_KEY": "*-*your-openai-key*-*"
}
```

Make sure to replace `*-*your-openai-key*-*` with your actual OpenAI API key.

### 3. Package the Custom Visual for PowerBI Desktop 📦

To package the custom visual, execute this command:

```bash
pbiviz package
```

After running the command, a `dist/` folder will be created. To import the custom visual, follow these steps:

1. Open PowerBI Desktop.
2. Go to `Home > Visualizations > Import a custom visual > Import from file`.
3. Navigate to the `dist/` folder, and select the `.pbiviz` file.

Congratulations! The custom visual should now be available in your PowerBI Desktop! 🎉

### 4. Customize and Make Changes ✏️

To make changes to the project, simply use this command:

```bash
pbiviz start
```

To test the changes in PowerBI.com, follow these steps:

1. Go to PowerBI.com and sign in.
2. Enter your workspace, then click on `Settings`.
3. Open the `Developer` section and enable the `Developer visuals` setting.
4. Return to your report, and you should see the `Developer` tab in the `Visualizations` pane.
5. The custom visual will automatically sync with the changes made locally.

Now you can personalize the custom visual as needed, while testing it in PowerBI.com!

Happy data analyzing! 🚀