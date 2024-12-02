def get_similarity_score(second_list, element):
    return element * second_list.count(element)

if __name__ == "__main__":
    file_contents = None
    with open("./input", "r") as file:
        file_contents = file.readlines()

    first_list = []
    second_list = []
    if file_contents:
        for line in file_contents:
            numbers = line.split()
            first_number = int(numbers[0])
            second_number = int(numbers[1])

            first_list.append(first_number)
            second_list.append(second_number)

    total_similarity_score = 0
    for num in first_list:
        total_similarity_score += get_similarity_score(second_list, num)

    print(total_similarity_score)

