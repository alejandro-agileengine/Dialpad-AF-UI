import phonenumbers
import math

def parse_data(data):
    final_data = []
    message = data["data"]["message"]
    numbers =  data["data"]["numbers"]
    date = data["data"]["date"]
    scheduled = data["data"]["scheduled"]
    final_parsed_numbers = parse_E164_format(numbers)
    for j in final_parsed_numbers:
        final_data.append({"text":message,"user_id":"test_user","to_numbers":j})
    return final_data

def parse_E164_format(numbers):
    parsed_numbers = []
    for j in numbers:
        x = phonenumbers.parse(j, "US")
        y = phonenumbers.format_number(x, phonenumbers.PhoneNumberFormat.E164)
        parsed_numbers.append(y)
    n = (len(parsed_numbers)/10.0)
    n = int(math.ceil(n))
    final_parsed_numbers = split_numbers(parsed_numbers,n)
    return final_parsed_numbers

def split_numbers(a, n):
    k, m = divmod(len(a), n)
    return (a[i*k+min(i, m):(i+1)*k+min(i+1, m)] for i in range(n))