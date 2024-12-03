def is_safe(nums):
    # Ugly brute force, check every subset for each row O(n^2)
    for i in range(len(nums)):
        is_valid_safe = True
        sub_nums = nums[:i] + nums[i+1:]

        is_decreasing = sub_nums[0] > sub_nums[1]
        prev = sub_nums[0]
        for j in range(1, len(sub_nums)):
            current = sub_nums[j]
            # If we go from decreasing to increasing or vice versa this row is not safe
            if (is_decreasing and current > prev) or (not is_decreasing and current < prev):
                is_valid_safe = False
            
            # Distance between two consecutive values should be no less than 1 and no more than 3
            diff = abs(prev - current)
            if (diff < 1 or diff > 3):
                is_valid_safe = False

            prev = current
    
        if (is_valid_safe):
            return True
    
    # If we went through all possible subsets and none were valid this row is not not safe
    return False

if __name__ == "__main__":
    file_contents = None
    with open("./input", "r") as file:
        file_contents = file.readlines()
        
    num_safe = 0
    # O(m) * O(n^2)
    for row in file_contents:
        nums = [int(num) for num in row.split(" ")]
        
        is_valid_safe = is_safe(nums)
        if is_valid_safe:
            num_safe += 1

    print(num_safe)

