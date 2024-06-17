from flask import Flask, jsonify, request
from transformers import AutoTokenizer, TFAutoModelForSeq2SeqLM

app = Flask(__name__)

# Load the T5 tokenizer and model
tokenizer = AutoTokenizer.from_pretrained('t5-base')
model = TFAutoModelForSeq2SeqLM.from_pretrained('t5-base')

@app.route('/summarize', methods=['POST', 'OPTIONS'])
def text_summarization():
    if request.method == 'OPTIONS':
        # Handle preflight CORS request
        response = app.make_default_options_response()
    else:
        text = request.json['text']

        # Tokenize the input text
        inputs = tokenizer.encode_plus(text, return_tensors='pt', max_length=512, truncation=True, padding=True)

        # Generate the summary
        summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=150, early_stopping=True)
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        # Create the response with CORS headers
        response = jsonify({'summary': summary})

    # Add CORS headers to allow requests from any origin
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')

    return response

if __name__ == '__main__':
    app.run(debug=True)

