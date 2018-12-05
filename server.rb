require "sinatra"
require "json"
require "pry" if settings.test? || settings.development?

set :bind, '0.0.0.0'  # bind to all interfaces

GROCERIES_JSON = File.join(File.dirname(__FILE__), "groceries.json")

def read_groceries
  data = File.read(GROCERIES_JSON)
  JSON.parse(data)
end

def add_grocery(grocery)
  groceries = read_groceries
  groceries["groceries"].push(grocery)
  json = JSON.pretty_generate(groceries, indent: '  ')
  File.write(GROCERIES_JSON, json)
end

get '/' do
  erb :homepage
end

get "/groceries" do
  erb :groceries
end

get '/groceries.json' do
  read_groceries.to_json
end

post '/groceries.json' do
  body = request.body.read
  json = JSON.parse(body)

  if !json["grocery"]["name"].empty?
    add_grocery(json["grocery"])

    status 201
    body
  else
    status 422
  end
end
