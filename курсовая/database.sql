
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    num_of_lost_book INT default 0 NOT NULL
);

CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    date_of_death DATE
);

CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    Name_book VARCHAR(255) NOT NULL,
    Author_id INT REFERENCES Authors(author_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    Genre VARCHAR(255) NOT NULL,
    Year_of_writing VARCHAR(20) NOT NULL,
    About_what TEXT NOT NULL,
    Num_in_bible INT NOT NULL
);

CREATE TABLE Librarians (
    librarian_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin varchar(20) DEFAULT 'user' NOT NULL
);

CREATE TABLE Book_distribution (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    book_id INT REFERENCES Books(book_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    librarian_id INT REFERENCES Librarians(librarian_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
    date_of_issue DATE NOT NULL,
    return_date DATE NOT NULL,
	is_returned boolean default 'false' NOT NULL
);
drop table Users
drop table Authors
drop table Books
drop table Librarians
drop table Book_distribution

INSERT INTO Users (name, surname, lastname, date_of_birth, address, phone, email, num_of_lost_book)
VALUES
	('Арина', 'Волчкова', 'Максимовна', '2005-06-27', 'Москва,ул.Тамбовская', '+79774272803', 'volrrisha@gmail.com', 0),
    ('Иван', 'Иванов', 'Петрович', '1990-05-15', 'Москва,ул.Ясенева', '1234567890', 'ivan@example.com', 0),
    ('Елена', 'Петрова', 'Александровна', '1985-08-20', 'Москва,ул.Елецкая', '9876543210', 'elena@example.com', 1),
    ('Александр', 'Сидоров', 'Дмитриевич', '1998-03-10', 'Москва,ул.Елецкая', '5555555555', 'alex@example.com', 2),
    ('Ольга', 'Козлова', 'Ивановна', '1995-11-25', 'Москва,ул.Ясенева', '7777777777', 'olga@example.com', 0),
    ('Дмитрий', 'Морозов', 'Андреевич', '1982-07-05', 'Москва,ул.Елецкая', '3333333333', 'dmitry@example.com', 3),
    ('Анна', 'Лебедева', 'Сергеевна', '1993-12-18', 'Москва,ул.Ясенева', '4444444444', 'anna@example.com', 0),
    ('Павел', 'Николаев', 'Игоревич', '1987-09-30', 'Москва,ул.Ясенева', '5555555555', 'pavel@example.com', 1),
    ('Мария', 'Смирнова', 'Алексеевна', '1991-04-12', 'Москва,ул.Ясенева', '6666666666', 'maria@example.com', 0),
    ('Андрей', 'Ковалев', 'Павлович', '1980-02-25', 'Москва,ул.Ясенева', '7777777777', 'andrey@example.com', 0),
    ('Екатерина', 'Медведева', 'Ивановна', '1988-11-08', 'Москва,ул.Тамбовская', '8888888888', 'ekaterina@example.com', 0),
    ('Сергей', 'Попов', 'Александрович', '1984-06-22', 'Москва,ул.Елецкая', '9999999999', 'sergey@example.com', 0),
    ('Татьяна', 'Васильева', 'Дмитриевна', '1996-01-14', 'Москва,ул.Елецкая', '1010101010', 'tatyana@example.com', 0),
    ('Игорь', 'Федоров', 'Сергеевич', '1989-10-03', 'Москва,ул.Елецкая', '1111111111', 'igor@example.com', 0),
    ('Наталья', 'Зайцева', 'Андреевна', '1994-03-28', 'Москва,ул.Тамбовская', '1212121212', 'natalya@example.com', 1),
    ('Владимир', 'Петров', 'Игоревич', '1983-08-17', 'Москва,ул.Тамбовская', '1313131313', 'vladimir@example.com', 0),
    ('Алиса', 'Соколова', 'Анатольевна', '1992-05-05', 'Москва,ул.Ясенева', '1414141414', 'alisa@example.com', 0),
    ('Глеб', 'Морозов', 'Алексеевич', '1987-12-10', 'Москва,ул.Ясенева', '1515151515', 'gleb@example.com', 0),
    ('Евгения', 'Ковалева', 'Павловна', '1990-09-20', 'Москва,ул.Ясенева', '1616161616', 'evgenia@example.com', 0),
    ('Артем', 'Смирнов', 'Игоревич', '1986-04-05', 'Москва,ул.Елецкая', '1717171717', 'artem@example', 0);
	
	
INSERT INTO Librarians (name, surname, lastname, email, password)
VALUES
	('Анастасия', 'Скугарова', 'Романовна', 'skugarova_a23@gmail.com', '11111'),
	('Арина', 'Волчкова', 'Максимовна', 'volarmak@gmail.com', '55555'),
	('Станислава', 'Волчкова', 'Максимовна', 'volarmak@gmail.com', '22222'),
	('Ольга', 'Ковалева', 'Игоревна', 'olga@example.com', 'mypassword6'),
    ('Павел', 'Николаев', 'Анатольевич', 'pavel@example.com', 'mypassword7');

INSERT INTO Authors (name, country, date_of_birth, date_of_death)
VALUES
-- 	('Лев Николаевич Толстой', 'Россия', '1828-09-09', '1910-11-20'),--1
	('Эрих Мария Ремарк', 'Германия', '1898-06-22', '1970-09-25'), --2
	('Николай Васильевич Гоголь', 'Россия', '1809-03-31', '1852-02-21'), --3
	('Федор Михайлович Достоевский', 'Россия', '1821-11-11', '1881-02-09'), --4
	('Александр Сергеевич Пушкин', 'Россия', '1799-06-06', '1837-02-10'), --5
	('Антон Павлович Чехов', 'Россия', '1860-01-29', '1904-07-15'), --6
	('Михаил Афанасьевич Булгаков', 'Россия', '1891-05-15', '1940-03-10'), --7
	('Владимир Владимирович Маяковский', 'Россия', '1893-07-19', '1930-04-14'), --8
	('Джордж Оруэлл', 'Великобритания', '1950-01-21', '1903-06-25'), --9
	('Джейн Остин', 'Великобритания', '1775-12-16', '1817-07-18'), --10
	('Уильям Шекспир', 'Великобритания', '1564-04-01', '1616-05-03'), --11
	('Льюис Кэрролл', 'Великобритания', '1832-01-27', '1898-01-14'), --12
	('Кир Булычёв', 'СССР', '1934-10-18', '2003-09-05'), --13
	('Рэй Дуглас Брэдбери', 'США', '1920-08-22', '2012-06-05'); --14

INSERT INTO Books (Name_book, Author_id, Genre, Year_of_writing, About_what, Num_in_bible)
VALUES
	('Алиса в стране чудес', 12, 'Сказка, абсурд', '1862-1865', 'Рассказывает о девочке по имени Алиса, которая попадает сквозь кроличью нору в воображаемый мир, населённый странными антропоморфными существами.', 20), --Льюис Кэрролл
	('Алиса в Зазеркалье', 12, 'Сказка, абсурд', '1871', 'Продолжение истории Алисы, где она проходит сквозь зеркало и попадает в Зазеркалье, мир, где все наоборот.', 20), --Льюис Кэрролл
	('Сто лет тому вперед', 13, 'Научная фантастика для детей', '1978', 'Рассказывает о приключениях Алисы Селезнёвой и школьника Коли, которые вступают в схватку с космическими пиратами.', 50), --Кир Булычёв
	('Гостья из будущего', 13, 'Научная фантастика для детей', 'Неизвестно', 'Рассказывает о приключениях Алисы Селезнёвой и школьника Коли, которые вступают в схватку с космическими пиратами.', 50), --Кир Булычёв
	('Ромео и Джульетта', 11, 'Трагедия', '1595', 'Рассказывает о любви юноши и девушки из двух враждующих веронских родов — Монтекки и Капулетти.', 34), --Уильям Шекспир
	('Гамлет', 11, 'Трагедия', '1600-1601', 'Рассказывает о принце Гамлете, который стремится отомстить за смерть своего отца.', 40), --Уильям Шекспир
	('Облако в штанах', 8, 'Поэма', '1914-1915', 'Рассказывает о переживаниях главного героя, его любви, разочаровании и протесте.', 66), --Маяковский
	('1984', 9, 'Антиутопия', '1949', 'Рассказывает о жизни в тоталитарном обществе, где все под контролем "Большого брата".', 45), --Оруэлл
	('Гордость и предупреждение', 10, 'Роман', '1813', 'Рассказывает о жизни английского дворянства в глубинке в первой половине XIX века.', 100), --Остин
	('Мастер и Маргарита', 7, 'Роман', '1928-1940', 'Роман рассказывает о посещении дьявола в лице профессора Воланда Москвы 1930-х годов и о трагической любви Мастера и Маргариты. В книге также присутствует параллельный сюжет о Понтии Пилате и Иисусе Христе, который является романом в романе, написанным Мастером.', 54),
	('Морфий', 7, 'Рассказ', 'Неизвестно', 'Рассказ описывает историю молодого врача, который становится зависимым от морфия. Это произведение основано на личном опыте Булгакова, который сам страдал от зависимости от морфия во время своей медицинской практики.', 54);
	
	
INSERT INTO Book_distribution (user_id, book_id, librarian_id, date_of_issue, return_date, is_returned)
VALUES
	(1, 1, 1, '2024-04-07','2024-05-30', '0'),
	(2, 2, 1, '2024-03-25','2024-05-30', '0'),
	(3, 3, 1, '2024-04-07','2024-05-30' , '0'),
	(4, 4, 2, '2024-04-08','2024-05-31', '0'),
	(5, 5, 2, '2024-04-02','2024-05-31', '0'),
	(6, 6, 2, '2024-04-05','2024-05-31', '0'),
	(7, 7, 5, '2024-04-03','2024-05-31', '0'),
	(8, 8, 4, '2024-04-05','2024-05-31', '0'),
	(9, 8, 5, '2024-04-07','2024-05-30', '0'),
	(20, 2, 5, '2024-04-06','2024-05-30', '0'),
	(11, 4, 4, '2024-04-06','2024-05-31', '0'),
	(12, 11, 1, '2024-04-04','2024-05-31', '0');
	
