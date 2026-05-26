THREE_ADDRESS_CODES = {
    "ARMSTRONG_NUMBER": """input num
original = num
sum = 0
temp = num
L1:
if temp <= 0 goto L2
digit = temp % 10
t1 = digit * digit
t2 = t1 * digit
t3 = sum + t2
sum = t3
t4 = temp / 10
temp = t4
goto L1
L2:
if sum == original goto L3
print "Not Armstrong"
goto L4
L3:
print "Armstrong Number"
L4:""",

    "ARRAY_AVERAGE": """input size
input arr
sum = 0
i = 0
L1:
if i >= size goto L2
t1 = arr[i]
t2 = sum + t1
sum = t2
t3 = i + 1
i = t3
goto L1
L2:
t4 = sum / size
avg = t4
print avg""",

    "ARRAY_INPUT_AND_OUTPUT": """input size
i = 0
L1:
if i >= size goto L2
input t1
arr[i] = t1
t2 = i + 1
i = t2
goto L1
L2:
i = 0
L3:
if i >= size goto L4
t3 = arr[i]
print t3
t4 = i + 1
i = t4
goto L3
L4:""",

    "ARRAY_MAX": """input size
input arr
max = arr[0]
i = 1
L1:
if i >= size goto L2
t1 = arr[i]
if t1 <= max goto L3
max = t1
L3:
t2 = i + 1
i = t2
goto L1
L2:
print max""",

    "ARRAY_MIN": """input size
input arr
min = arr[0]
i = 1
L1:
if i >= size goto L2
t1 = arr[i]
if t1 >= min goto L3
min = t1
L3:
t2 = i + 1
i = t2
goto L1
L2:
print min""",

    "ARRAY_PRINT": """input size
input arr
i = 0
L1:
if i >= size goto L2
t1 = arr[i]
print t1
t2 = i + 1
i = t2
goto L1
L2:""",

    "ARRAY_REVERSE": """input size
input arr
left = 0
t1 = size - 1
right = t1
L1:
if left >= right goto L2
temp = arr[left]
t2 = arr[right]
arr[left] = t2
arr[right] = temp
t3 = left + 1
left = t3
t4 = right - 1
right = t4
goto L1
L2:
print arr""",

    "ARRAY_SUM": """input size
input arr
sum = 0
i = 0
L1:
if i >= size goto L2
t1 = arr[i]
t2 = sum + t1
sum = t2
t3 = i + 1
i = t3
goto L1
L2:
print sum""",

    "BINARY_SEARCH": """input size
input arr
input target
low = 0
t1 = size - 1
high = t1
found = -1
L1:
if low > high goto L2
t2 = low + high
t3 = t2 / 2
mid = t3
t4 = arr[mid]
if t4 != target goto L3
found = mid
goto L2
L3:
if t4 <= target goto L4
t5 = mid - 1
high = t5
goto L5
L4:
t6 = mid + 1
low = t6
L5:
goto L1
L2:
print found""",

    "BINARY_TO_DECIMAL": """input binary
decimal = 0
base = 1
temp = binary
L1:
if temp <= 0 goto L2
last_digit = temp % 10
t1 = last_digit * base
t2 = decimal + t1
decimal = t2
t3 = base * 2
base = t3
t4 = temp / 10
temp = t4
goto L1
L2:
print decimal""",

    "BUBBLE_SORT": """input size
input arr
i = 0
L1:
t1 = size - 1
if i >= t1 goto L2
j = 0
L3:
t2 = size - i
t3 = t2 - 1
if j >= t3 goto L4
t4 = j + 1
t5 = arr[j]
t6 = arr[t4]
if t5 <= t6 goto L5
temp = arr[j]
arr[j] = t6
arr[t4] = temp
L5:
t7 = j + 1
j = t7
goto L3
L4:
t8 = i + 1
i = t8
goto L1
L2:
print arr""",

    "COUNT_CONSONANTS": """input str
count = 0
i = 0
L1:
t1 = len(str)
if i >= t1 goto L2
char = str[i]
t2 = is_alphabetic(char)
if t2 == 0 goto L3
t3 = is_vowel(char)
if t3 == 1 goto L3
t4 = count + 1
count = t4
L3:
t5 = i + 1
i = t5
goto L1
L2:
print count""",

    "COUNT_DIGITS": """input n
count = 0
temp = n
L1:
if temp <= 0 goto L2
t1 = count + 1
count = t1
t2 = temp / 10
temp = t2
goto L1
L2:
print count""",

    "COUNT_VOWELS": """input str
count = 0
i = 0
L1:
t1 = len(str)
if i >= t1 goto L2
char = str[i]
t2 = is_vowel(char)
if t2 == 0 goto L3
t3 = count + 1
count = t3
L3:
t4 = i + 1
i = t4
goto L1
L2:
print count""",

    "CUBE_OF_NUMBER": """input n
t1 = n * n
t2 = t1 * n
cube = t2
print cube""",

    "DECIMAL_TO_BINARY": """input decimal
binary = 0
place = 1
temp = decimal
L1:
if temp <= 0 goto L2
rem = temp % 2
t1 = rem * place
t2 = binary + t1
binary = t2
t3 = place * 10
place = t3
t4 = temp / 2
temp = t4
goto L1
L2:
print binary""",

    "EVEN_OR_ODD": """input n
t1 = n % 2
if t1 != 0 goto L1
print "Even"
goto L2
L1:
print "Odd"
L2:""",

    "FACTORIAL": """input n
fact = 1
i = 1
L1:
if i > n goto L2
t1 = fact * i
fact = t1
t2 = i + 1
i = t2
goto L1
L2:
print fact""",

    "FIBONACCI": """input n
a = 0
b = 1
i = 0
L1:
if i >= n goto L2
print a
t1 = a + b
a = b
b = t1
t2 = i + 1
i = t2
goto L1
L2:""",

    "GCD": """input a
input b
L1:
if b == 0 goto L2
t1 = a % b
temp = t1
a = b
b = temp
goto L1
L2:
print a""",

    "INSERTION_SORT": """input size
input arr
i = 1
L1:
if i >= size goto L2
key = arr[i]
t1 = i - 1
j = t1
L3:
if j < 0 goto L4
t2 = arr[j]
if t2 <= key goto L4
t3 = j + 1
arr[t3] = t2
t4 = j - 1
j = t4
goto L3
L4:
t5 = j + 1
arr[t5] = key
t6 = i + 1
i = t6
goto L1
L2:
print arr""",

    "INVERTED_STAR_PATTERN": """input rows
i = rows
L1:
if i <= 0 goto L2
j = 0
L3:
if j >= i goto L4
print "*"
t1 = j + 1
j = t1
goto L3
L4:
print newline
t2 = i - 1
i = t2
goto L1
L2:""",

    "LCM": """input a
input b
t1 = a > b
if t1 == 0 goto L1
max = a
goto L2
L1:
max = b
L2:
L3:
t2 = max % a
t3 = max % b
if t2 != 0 goto L4
if t3 == 0 goto L5
L4:
t4 = max + 1
max = t4
goto L3
L5:
lcm = max
print lcm""",

    "LEAP_YEAR_CHECK": """input year
t1 = year % 4
if t1 != 0 goto L1
t2 = year % 100
if t2 != 0 goto L2
t3 = year % 400
if t3 == 0 goto L2
L1:
print "Not Leap Year"
goto L3
L2:
print "Leap Year"
L3:""",

    "LINEAR_SEARCH": """input size
input arr
input target
found = -1
i = 0
L1:
if i >= size goto L2
t1 = arr[i]
if t1 != target goto L3
found = i
goto L2
L3:
t2 = i + 1
i = t2
goto L1
L2:
print found""",

    "MATRIX_ADDITION": """input rows
input cols
input A
input B
i = 0
L1:
if i >= rows goto L2
j = 0
L3:
if j >= cols goto L4
t1 = A[i][j]
t2 = B[i][j]
t3 = t1 + t2
C[i][j] = t3
t4 = j + 1
j = t4
goto L3
L4:
t5 = i + 1
i = t5
goto L1
L2:
print C""",

    "MATRIX_MULTIPLICATION": """input r1
input c1
input r2
input c2
input A
input B
if c1 != r2 goto ERROR
i = 0
L1:
if i >= r1 goto L2
j = 0
L3:
if j >= c2 goto L4
C[i][j] = 0
k = 0
L5:
if k >= c1 goto L6
t1 = A[i][k]
t2 = B[k][j]
t3 = t1 * t2
t4 = C[i][j] + t3
C[i][j] = t4
t5 = k + 1
k = t5
goto L5
L6:
t6 = j + 1
j = t6
goto L3
L4:
t7 = i + 1
i = t7
goto L1
L2:
print C
goto END
ERROR:
print "Invalid dimensions"
END:""",

    "MATRIX_TRANSPOSE": """input rows
input cols
input A
i = 0
L1:
if i >= rows goto L2
j = 0
L3:
if j >= cols goto L4
t1 = A[i][j]
T[j][i] = t1
t2 = j + 1
j = t2
goto L3
L4:
t3 = i + 1
i = t3
goto L1
L2:
print T""",

    "MAX_OF_THREE_NUMBERS": """input a
input b
input c
if a <= b goto L1
if a <= c goto L2
max = a
goto END
L1:
if b <= c goto L2
max = b
goto END
L2:
max = c
END:
print max""",

    "MAX_OF_TWO_NUMBERS": """input a
input b
if a <= b goto L1
max = a
goto END
L1:
max = b
END:
print max""",

    "MERGE_SORT": """input size
input arr
call merge_sort(arr, 0, size-1)
print arr

define merge_sort(arr, l, r):
if l >= r goto END_SORT
t1 = l + r
t2 = t1 / 2
mid = t2
call merge_sort(arr, l, mid)
t3 = mid + 1
call merge_sort(arr, t3, r)
call merge(arr, l, mid, r)
END_SORT:
ret""",

    "MULTIPLICATION_TABLE": """input n
i = 1
L1:
if i > 10 goto L2
t1 = n * i
print t1
t2 = i + 1
i = t2
goto L1
L2:""",

    "NUMBER_PATTERN": """input rows
i = 1
L1:
if i > rows goto L2
j = 1
L3:
if j > i goto L4
print j
t1 = j + 1
j = t1
goto L3
L4:
print newline
t2 = i + 1
i = t2
goto L1
L2:""",

    "PALINDROME_NUMBER": """input n
original = n
rev = 0
temp = n
L1:
if temp <= 0 goto L2
rem = temp % 10
t1 = rev * 10
t2 = t1 + rem
rev = t2
t3 = temp / 10
temp = t3
goto L1
L2:
if rev == original goto L3
print "Not Palindrome"
goto END
L3:
print "Palindrome"
END:""",

    "POWER_OF_NUMBER": """input base
input exponent
result = 1
i = 0
L1:
if i >= exponent goto L2
t1 = result * base
result = t1
t2 = i + 1
i = t2
goto L1
L2:
print result""",

    "PRIME_CHECK": """input n
flag = 1
if n <= 1 goto L2
i = 2
L1:
t1 = n / 2
if i > t1 goto L3
t2 = n % i
if t2 != 0 goto L4
flag = 0
goto L3
L4:
t3 = i + 1
i = t3
goto L1
L3:
if flag == 1 goto L5
L2:
print "Not Prime"
goto END
L5:
print "Prime"
END:""",

    "PRIME_FACTORS": """input n
i = 2
L1:
if n <= 1 goto L2
L3:
t1 = n % i
if t1 != 0 goto L4
print i
t2 = n / i
n = t2
goto L3
L4:
t3 = i + 1
i = t3
goto L1
L2:""",

    "PRIME_NUMBERS_IN_RANGE": """input lower
input upper
n = lower
L1:
if n > upper goto L2
flag = 1
if n <= 1 goto L3
i = 2
L4:
t1 = n / 2
if i > t1 goto L5
t2 = n % i
if t2 != 0 goto L6
flag = 0
goto L5
L6:
t3 = i + 1
i = t3
goto L4
L5:
if flag == 0 goto L3
print n
L3:
t4 = n + 1
n = t4
goto L1
L2:""",

    "PRINT_EVEN_NUMBERS": """input n
i = 2
L1:
if i > n goto L2
print i
t1 = i + 2
i = t1
goto L1
L2:""",

    "PRINT_NUMBERS_1_TO_N": """input n
i = 1
L1:
if i > n goto L2
print i
t1 = i + 1
i = t1
goto L1
L2:""",

    "PRINT_ODD_NUMBERS": """input n
i = 1
L1:
if i > n goto L2
print i
t1 = i + 2
i = t1
goto L1
L2:""",

    "QUICK_SORT": """input size
input arr
call quick_sort(arr, 0, size-1)
print arr

define quick_sort(arr, low, high):
if low >= high goto END_SORT
call partition(arr, low, high, pivot_idx)
t1 = pivot_idx - 1
call quick_sort(arr, low, t1)
t2 = pivot_idx + 1
call quick_sort(arr, t2, high)
END_SORT:
ret""",

    "REVERSE_NUMBER": """input n
rev = 0
temp = n
L1:
if temp <= 0 goto L2
rem = temp % 10
t1 = rev * 10
t2 = t1 + rem
rev = t2
t3 = temp / 10
temp = t3
goto L1
L2:
print rev""",

    "SELECTION_SORT": """input size
input arr
i = 0
L1:
t1 = size - 1
if i >= t1 goto L2
min_idx = i
t2 = i + 1
j = t2
L3:
if j >= size goto L4
t3 = arr[j]
t4 = arr[min_idx]
if t3 >= t4 goto L5
min_idx = j
L5:
t5 = j + 1
j = t5
goto L3
L4:
temp = arr[i]
t6 = arr[min_idx]
arr[i] = t6
arr[min_idx] = temp
t7 = i + 1
i = t7
goto L1
L2:
print arr""",

    "SQUARE_ROOT": """input n
t1 = call sqrt(n)
ans = t1
print ans""",

    "STAR_PATTERN_PYRAMID": """input rows
i = 1
L1:
if i > rows goto L2
space = 1
L3:
t1 = rows - i
if space > t1 goto L4
print " "
t2 = space + 1
space = t2
goto L3
L4:
j = 1
L5:
t3 = 2 * i
t4 = t3 - 1
if j > t4 goto L6
print "*"
t5 = j + 1
j = t5
goto L5
L6:
print newline
t6 = i + 1
i = t6
goto L1
L2:""",

    "STAR_PATTERN_TRIANGLE": """input rows
i = 1
L1:
if i > rows goto L2
j = 1
L3:
if j > i goto L4
print "*"
t1 = j + 1
j = t1
goto L3
L4:
print newline
t2 = i + 1
i = t2
goto L1
L2:""",

    "STRING_LENGTH": """input str
len = 0
L1:
t1 = str[len]
if t1 == null goto L2
t2 = len + 1
len = t2
goto L1
L2:
print len""",

    "STRING_PALINDROME": """input str
left = 0
t1 = len(str)
t2 = t1 - 1
right = t2
is_pal = 1
L1:
if left >= right goto L2
t3 = str[left]
t4 = str[right]
if t3 == t4 goto L3
is_pal = 0
goto L2
L3:
t5 = left + 1
left = t5
t6 = right - 1
right = t6
goto L1
L2:
if is_pal == 1 goto L4
print "Not Palindrome"
goto END
L4:
print "Palindrome"
END:""",

    "STRING_REVERSE": """input str
rev = ""
t1 = len(str)
i = t1 - 1
L1:
if i < 0 goto L2
t2 = str[i]
t3 = rev + t2
rev = t3
t4 = i - 1
i = t4
goto L1
L2:
print rev""",

    "SUM_OF_DIGITS": """input n
sum = 0
temp = n
L1:
if temp <= 0 goto L2
rem = temp % 10
t1 = sum + rem
sum = t1
t2 = temp / 10
temp = t2
goto L1
L2:
print sum""",

    "SUM_OF_N_NUMBERS": """input n
sum = 0
i = 1
L1:
if i > n goto L2
t1 = sum + i
sum = t1
t2 = i + 1
i = t2
goto L1
L2:
print sum""",

    "SWAP_TWO_NUMBERS": """input a
input b
temp = a
a = b
b = temp
print a
print b"""
}


def get_three_address_code(program_name):
    # Returns 3AC based on program name
    upper_name = program_name.upper()
    return THREE_ADDRESS_CODES.get(upper_name, f"// Three-Address Code for {upper_name}\\n// Not available")
