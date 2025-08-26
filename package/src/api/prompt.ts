
export const getPromptResponse = async (text: string, prompt: string, tone?: string, style?: string) => {
    try {
        const response = await fetch('https://promptmyclient.com/client/prompts/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ''
            },
            body: JSON.stringify({
                prompt: prompt + "```"+ text +"```",
                tone: tone || "friendly",
                style: style || "concise",
                model: "gpt-3.5",
                user_id: "ac0af693-cf3d-4574-b87a-2bd3ece172d8"
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