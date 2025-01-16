const express = require("express");
const app = express();
const port = 3000;

const naturalNumber = [83, 1, 78, 26, 67, 54, 49, 7, 36, 99, 26, 19, 15, 7, 21, 39, 7, 2, 8];

function countElements(array) {
    var count = 0;
    for (let i = 0; i < array.length; i++) {
        count++;
    }
    return count;
}

function findSmallest(array) {
    var smallest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < smallest) {
            smallest = array[i];
        }
    }
    return smallest;
}

function findBiggest(array) {
    var biggest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > biggest) {
            biggest = array[i];
        }
    }
    return biggest;
}

function findDuplicate(array) {
    const dup = [];
    for (let i = 0; i < array.length; i++) {
        var count = 0;
        for (let j = 0; j < array.length; j++) {
            if (array[i] === array[j] && i !== j) {
                count++;
            }
        }
        if (count > 0 && !dup.includes(array[i])) {
            dup.push(array[i]);
        }
    }
    return dup;
}

function sortArray(array) {
    const sorted = [...array];
    for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
            if (sorted[i] > sorted[j]) {
                var temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }
        }
    }
    return sorted;
}

function sortedDuplicate(array) {
    const duplicate = findDuplicate(array);
    const sortedArray = sortArray(array);
    const index = duplicate.map((value) => {
        return sortedArray.indexOf(value) + 1;
    });
    return index;
}

function countOddEven(array) {
    var odd = 0;
    var even = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }
    return { odd, even };
}

function groupOddEven(array) {
    const odd = [];
    const even = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            even.push(array[i]);
        } else {
            odd.push(array[i]);
        }
    }
    return { odd, even };
}

// Buat endpoint API untuk menghitung jumlah anggota Himpunan Bilangan Asli! 
app.get("/jumlah-anggota", (req, res) => {
    const total = countElements(naturalNumber);
    res.json({
        status: true,
        message: "Successfully count elements of the natural numbers",
        data: total,
    });
});

// Buat algoritma untuk menghasilkan anggota terkecil dari Himpunan Bilangan Asli!
app.get("/terkecil", (req, res) => {
    const smallest = findSmallest(naturalNumber);
    res.json({
        status: true,
        message: "Successfully found the smallest element",
        data: smallest,
    });
});

// Buat algoritma untuk menghasilkan anggota terbesar dari Himpunan Bilangan Asli!
app.get("/terbesar", (req, res) => {
    const biggest = findBiggest(naturalNumber);
    res.json({
        status: true,
        message: "Successfully found the biggest element",
        data: biggest,
    });
});

// Buat algoritma untuk mencari & menghasilkan anggota dari Himpunan Bilangan Asli dengan nilai angka sama dan lebih dari satu!
app.get("/angka-duplikat", (req, res) => {
    const duplicates = findDuplicate(naturalNumber);
    res.json({
        status: true,
        message: "Successfully found duplicate elements",
        data: duplicates,
    });
});

// Buat algoritma jika diurutkan anggota himpunan bilangan asli dari kecil ke besar, untuk anggota yang memiliki nilai angka yang sama dan lebih dari satu, 
// pada soal nomor 4, berada di urutan ke berapakah pada Himpunan Bilangan Asli?
app.get("/posisi-duplikat", (req, res) => {
    const positions = sortedDuplicate(naturalNumber);
    res.json({
        status: true,
        message: "Successfully found positions of duplicate elements in sorted array",
        data: positions,
    });
});

// Buat algoritma untuk menghitung jumlah anggota bilangan ganjil dan genap. Ada berapa jumlahnya masing-masing?
app.get("/jumlah-ganjil-genap", (req, res) => {
    const { odd, even } = countOddEven(naturalNumber);
    res.json({
        status: true,
        message: "Successfully counted odd and even numbers",
        data: { odd, even },
    });
});

// Buat algoritma untuk mengelompokkan dan menampilkan anggota Himpunan Bilangan Asli dalam kelompok bilangan ganjil dan genap!
app.get("/kelompok-ganjil-genap", (req, res) => {
    const grouped = groupOddEven(naturalNumber);
    res.json({
        status: true,
        message: "Successfully grouped odd and even numbers",
        data: grouped,
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at PORT: ${port}`);
});