
export const getPromptResponse = async (text: string, prompt: string, tone?: string, style?: string) => {
    try {
        const response = await fetch('http://localhost:5000/client/prompts/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'pk_24767873c8bcaa67b1ee391d09914827f4a5a681c6adab5f269c3941facf5940'
            },
            body: JSON.stringify({
                prompt: prompt + "```"+ text +"```",
                tone: tone || "friendly",
                style: style || "concise",
                model: "gpt-3.5",
                user_id: "9d57cff0-edfd-4126-a0aa-19605f543f35"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling prompt API:', error);
        throw error;
    }
}