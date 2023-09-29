import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function aiGeneration(input) {
    if (!configuration.apiKey) {
        const error = {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
        return error
            ;
    }

    const ingredient = input || '';
    if (ingredient.trim().length === 0) {
        const error = {
            message: "No recipe suggestions",
        }
        return error
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt(ingredient),
            temperature: 0.6,
        });
        console.log(completion)
        const result = completion.data.choices[0].text
        return result
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
    }
}


function prompt(ingredient) {
    return `Please suggest one recipe to make with this ingredient: ${ingredient}`;
}
