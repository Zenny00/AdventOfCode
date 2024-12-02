def get_distance(first_list, second_list, pos):
    return abs(first_list[pos] - second_list[pos])

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

        first_list.sort()
        second_list.sort()

    total_distance = 0
    for i in range(len(first_list)):
        total_distance += get_distance(first_list, second_list, i)

    print(total_distance)
