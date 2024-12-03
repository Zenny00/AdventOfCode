def is_safe(nums):
    is_decreasing = nums[0] > nums[1]
    is_valid_safe = True
    prev = nums[0]
    for i in range(1, len(nums)):
        current = nums[i]
        # If we go from decreasing to increasing or vice versa this row is not safe
        if (is_decreasing and current > prev) or (not is_decreasing and current < prev):
            is_valid_safe = False
        
        # Distance between two consecutive values should be no less than 1 and no more than 3
        diff = abs(prev - current)
        if (diff < 1 or diff > 3):
            is_valid_safe = False
        
        prev = current

    return is_valid_safe

if __name__ == "__main__":
    file_contents = None
    with open("./input", "r") as file:
        file_contents = file.readlines()
        
    num_safe = 0
    for row in file_contents:
        nums = [int(num) for num in row.split(" ")]
        
        is_valid_safe = is_safe(nums)
        if is_valid_safe:
            num_safe += 1

    print(num_safe)

