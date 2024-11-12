IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Pops')
  BEGIN
    CREATE DATABASE Pops;
    
    USE Pops;

/*##########################################################################*/
    CREATE TABLE Pais(
        pais_id INT IDENTITY(1,1) PRIMARY KEY,
        pais_nombre NVARCHAR(50) NOT NULL,
        pais_acronimo VARCHAR(4) NOT NULL,
        pais_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO Pais(pais_nombre, pais_acronimo) 
    VALUES
    ('Costa Rica', 'CRC'),
    ('Guatemala', 'GTM'),
    ('Nicaragua', 'NIC')
    ;
/*##########################################################################*/

    CREATE TABLE puesto(
        pue_id INT IDENTITY(1,1) PRIMARY KEY,
        pue_nombre NVARCHAR(50) NOT NULL,
        pue_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    /*
    INSERT INTO Puesto(Nombre, Abreviatura)
    VALUES
    (N'ANALISTA DE SALUD OCUPACIONAL'),
    (N'JEFE DE SALUD OCUPACIONAL Y SERV GENERALES'),
    (N'ANALISTA DE ATRACCIÓN Y FIDELIZACION'),
    (N'ANALISTA DE SERVICIOS GENERALES'),
    (N'GESTOR DE CULTURA Y BIENESTAR'),
    (N'ANALISTA DE BIENESTAR INTEGRAL'),
    (N'ANALISTA DE FORMACION Y DESARROLLO'),
    (N'JEFE DE BIENESTAR INTEGRAL'),
    (N'DIRECTOR DE DESARROLLO HUMANO Y CUL ORG'),
    (N'COORDINADORA DE FORMACION Y DESARROLLO'),
    (N'COORDINADOR DE BIENESTAR INTEGRAL'),
    (N'AUXILIAR DE SERVICIOS GENERALES'),
    (N'JEFE DE PLANEACION Y DESARROLLO DE TALENTO'),
    (N'AUXILIAR DE BIENESTAR INTEGRAL'),
    (N'ANALISTA DE CONTROL GESTIÓN'),
    (N'JEFE DE COSTOS Y TRANSFORMACION DIGITAL'),
    (N'ANALISTA DE TRANSFORMACION DIGITAL'),
    (N'AUXILIAR DE SERVICIOS FINANCIEROS'),
    (N'JEFE DE SERVICIOS FINANCIEROS'),
    (N'DIRECTOR FINANCIERO'),
    (N'ANALISTA DE INFORMACIÓN COMERCIAL-VENTAS'),
    (N'COORDINADOR DE TRANSFORMACION DIGITAL'),
    (N'ANALISTA DE COSTOS'),
    (N'JEFE DE CONTROL GESTION'),
    (N'SOPORTE ADMINISTRATIVO 1'),
    (N'GERENTE GENERAL'),
    (N'ADMINISTRADOR DE PROYECTOS'),
    (N'JEFE DE LOGISTICA'),
    (N'ENCARGADO DE PISO CEDI'),
    (N'DIRECTOR DE CADENA DE ABASTECIMIENTO'),
    (N'ANALISTA DE INVENTARIOS'),
    (N'JEFE DE ABASTECIMIENTO'),
    (N'COORDINADOR DE PLANEACIÓN DE LA DEMANDA'),
    (N'ANALISTA DE DATOS MAESTROS'),
    (N'ANALISTA DE ABASTECIMIENTO'),
    (N'ANALISTA DE PLANEACIÓN DE LA DEMANDA'),
    (N'FACTURADOR'),
    (N'AUXILIAR DE LIQUIDACION Y CARTERA'),
    (N'COORDINADOR DE DISTRIBUCIÓN'),
    (N'AUXILIAR DE INFO. DISTRIBUCIÓN'),
    (N'ANALISTA DE I&D'),
    (N'ANALISTA DE INFORMACION DE SIG'),
    (N'AUXILIAR DE GESTION AMBIENTAL'),
    (N'ANALISTA DE SIG'),
    (N'ANALISTA DE INNOVACION'),
    (N'COORDINADOR I&D'),
    (N'ANALISTA DE GESTION AMBIENTAL'),
    (N'DIRECTOR DE INNOVA. Y SIST. INT. GESTION'),
    (N'AUDITOR SIG'),
    (N'COORDINADOR DE SIG'),
    (N'AUXILIAR DE VENTAS DIGITALES'),
    (N'ANALISTA DE TRADE MARKETING'),
    (N'JEFE DE MERCADEO DE CONSUMO MASIVO'),
    (N'DESARROLLADOR DE NUEVOS NEGOCIOS'),
    (N'COORDINADOR DE COMUNICACIONES'),
    (N'COORDINADOR DE TRADE DE MARKETING'),
    (N'JEFE DE MERCADEO DE HELADERIAS'),
    (N'AUXILIAR DE SERVICIO AL CLIENTE'),
    (N'ESPECIALISTA EN MARKETING DIGITAL'),
    (N'DIRECTOR DE MERCADEO'),
    (N'VENDEDOR'),
    (N'GENERADOR DE DEMANDA'),
    (N'SUPERVISOR DE VENTAS'),
    (N'COORDINADOR DE PROYECTOS'),
    (N'DIRECTOR DE PROYECTOS E INFRAESTRUCTURA'),
    (N'INGENIERA CIVIL'),
    (N'AUXILIAR DE INFORMACION COMERCIAL'),
    (N'JEFE DE SERVICIOS COMERCIALES Y FRANQUICIAS'),
    (N'DIRECTOR COMERCIAL'),
    (N'ANALISTA DE SERVICIOS COMERCIALES'),
    (N'AUXILIAR DE INVENTARIOS'),
    (N'COORDINADOR DE ZONA'),
    (N'JEFE DE ZONA'),
    (N'COORDINADOR DE MTTO PDV'),
    (N'ANALISTA DE INFORMACIÓN DE PRODUCCIÓN'),
    (N'JEFE DE PRODUCCION'),
    (N'AUXILIAR DE INFO. DE PRODUCCIÓN'),
    (N'COORDINADOR DE PRODUCCION'),
    (N'ENCARGADO DE LABORATORIO'),
    (N'ENCARGADO DE PISO ALMACEN'),
    (N'ANALISTA DE MANTENIMIENTO PLANTA'),
    (N'JEFE MANTENIMIENTO DE PLANTA'),
    (N'AUXILIAR DE MANTENIMIENTO'),
    (N'ENCARGADO DE PISO PRODUCCION'),
    (N'AUXILIAR DE FORMACION Y DESARROLLO'),
    (N'ANALISTA DE ATRACCIÓN'),
    (N'JEFE DE DHCO'),
    (N'ANALISTA DE TI'),
    (N'COORDINADOR DE ALMACENES'),
    (N'ANALISTA DE PLANEACION Y ABASTECIMIENTO'),
    (N'ANALISTA DE CALIDAD DE PDV'),
    (N'JEFE DE MERCADEO'),
    (N'COORDINADOR DE MARCA'),
    (N'JEFE DE VENTAS'),
    (N'AUXILIAR DE VENTAS'),
    (N'AUXILIAR DE INFO. DE PROYECTOS'),
    (N'AUXILIAR DE CONTROL Y GESTION'),
    (N'AUXILIAR DE SERVICIOS COMERCIALES'),
    (N'GERENTE DE PAIS'),
    (N'COORDINADOR DE SERVICIOS COMERCIALES'),
    (N'JEFE DE OPERACIONES COMERCIALES'),
    (N'COORDINADOR DE OPERACIONES'),
    (N'COORDINADOR DE PRODUCCIÓN'),
    (N'SUPERVISOR DE OPERACIONES'),
    (N'COORDINADOR DE LOGISTICA'),
    (N'ANALISTA DE SERVICIOS FINANCIEROS'),
    (N'AUXILIAR LOGISTICO'),
    (N'COORDINADOR DE MERCADEO Y VENTAS')
    */

/*##########################################################################*/
    CREATE TABLE departamento(
        depto_id INT IDENTITY(1,1) PRIMARY KEY,
        depto_nombre NVARCHAR(50) NOT NULL,
        depto_estado CHAR(1) NOT NULL DEFAULT 'A',
    );

    /*
    ('ABASTECIMIENTO','A'),
    ('ADM. GENERAL DE MANTENIMIENTO','A'),
    ('ADM. GENERAL DE PLANTA','A'),
    ('ALMACEN','A'),
    ('CEDI','A'),
    ('COCINA','A'),
    ('COMERCIAL','A'),
    ('DHCO','A'),
    ('FACTURACION','A'),
    ('FINANCIERA','A'),
    ('GERENCIA DE PAIS','A'),
    ('GERENCIA GENERAL','A'),
    ('HELADOS','A'),
    ('LABORATORIO','A'),
    ('LIDERES DE EQUIPO','A'),
    ('LOGISTICA','A'),
    ('MANTENIMIENTO PDV','A'),
    ('MERCADEO','A'),
    ('MIXTURAS','A'),
    ('PROYECTOS Y MANT PDV','A'),
    ('SISTEMAS INTEGRADOS DE GESTION','A'),
    ('TI','A'),
    ('TRANSPORTES','A'),
    ('VENDEDORES','A');
    */

/*##########################################################################*/

    CREATE TABLE direccion(
        dir_id INT IDENTITY(1,1) PRIMARY KEY,
        dir_nombre NVARCHAR(50) NOT NULL,
        dir_depto_id INT NOT NULL,
        dir_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY(dir_depto_id) REFERENCES Departamento(depto_id)
    );

    /*
    ('CDA',1,'A'),
    ('MANTENIMIENTO',2,'A'),
    ('CDA',3,'A'),
    ('CDA',4,'A'),
    ('CDA',5,'A'),
    ('CDA',6,'A'),
    ('COMERCIAL',7,'A'),
    ('DHCO',8,'A'),
    ('CDA',9,'A'),
    ('FINANCIERA',10,'A'),
    ('GERENCIA DE PAIS',11,'A'),
    ('GERENCIA GENERAL',12,'A'),
    ('CDA',13,'A'),
    ('SIG',14,'A'),
    ('COMERCIAL',15,'A'),
    ('LIDERES DE EQUIPO',15,'A'),
    ('LOGISTICA',16,'A'),
    ('MANTENIMIENTO',17,'A'),
    ('MERCADEO',18,'A'),
    ('CDA',19,'A'),
    ('MANTENIMIENTO',20,'A'),
    ('SIG',21,'A'),
    ('COMERCIAL',22,'A'),
    ('CDA',23,'A'),
    ('COMERCIAL',24,'A');
    */

/*##########################################################################*/

    CREATE TABLE colaborador(
        col_id UNIQUEIDENTIFIER,
        col_identificacion NVARCHAR(50) NOT NULL,
        col_nombre NVARCHAR(50) NOT NULL,
        col_segundo_nombre NVARCHAR(50) NOT NULL,
        col_primer_apellido NVARCHAR(50) NOT NULL,
        col_segundo_apellido NVARCHAR(50) NOT NULL,
        col_genero CHAR(1) NOT NULL,
        col_email NVARCHAR(50) NOT NULL,
        col_pais_id INT NOT NULL,
        col_pais_labura INT NOT NULL,
        col_puesto_id INT NOT NULL,
        col_depto_id INT NOT NULL,
        col_direccion_id INT NOT NULL,
        col_fecha_ingreso DATE NOT NULL,
        col_jefatura_id INT NOT NULL,
        col_a_cargo CHAR(1) NOT NULL,
        col_estado CHAR(1) NOT NULL DEFAULT 'A',
        PRIMARY KEY(col_id), 
        FOREIGN KEY(col_pais_id) REFERENCES Pais(pais_id),
        FOREIGN KEY(col_puesto_id) REFERENCES Puesto(pue_id),
        FOREIGN KEY(col_depto_id) REFERENCES Departamento(depto_id),
        FOREIGN KEY(col_direccion_id) REFERENCES Direccion(dir_id),
        FOREIGN KEY(col_jefatura_id) REFERENCES Jefatura(jef_id)
    );
    

/*##########################################################################*/
    CREATE TABLE talento(
        tal_id INT IDENTITY(1,1) PRIMARY KEY,
        tal_nombre NVARCHAR(50) NOT NULL,
        tal_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    /*
    INSERT INTO talento(Nombre)
    VALUES
    (N'adaptabilidad'),
    (N'desarrollo_de_si_mismo_y_de_otros'),
    (N'vision_sostenible'),
    (N'innovacion_con_valores'),
    (N'inspiracion_al_logro'),
    (N'mentalidad_sin_fronteras'),
    (N'pasión_por_el_invitado_y_el_consumidor'),
    (N'sentido_colectivo'),
    (N'rendimiento_individual')
    */

/*##########################################################################*/
CREATE TABLE detalle_talento(
    det_tal_id INT IDENTITY(1,1) PRIMARY KEY,
    det_tal_tal_id INT NOT NULL,
    det_tal_texto NVARCHAR(MAX) NOT NULL,
    det_tal_personal_a_cargo CHAR(1) NOT NULL,
    det_tal_estado CHAR(1) NOT NULL DEFAULT 'A',
    FOREIGN KEY(det_tal_tal_id) REFERENCES talento(tal_id)
);

/*
    INSERT INTO detalle_talento(det_tal_tal_id, det_tal_texto, det_tal_personal_a_cargo, det_tal_estado)
    VALUES
    (1, N'Propone e incorpora de forma ágil y simple nuevas prácticas que le permiten actuar de forma efectiva.', 'N', 'A'),
    (1, N'Actúa con flexibilidad desafiando sus paradigmas y reconociendo que las cosas se pueden hacer diferente.', 'N', 'A'),
    (1, N'Está dispuesto a ser parte de los cambios aunque sea algo desconocido o no esté todo definido.', 'N', 'A'),

    (2, N'Es consciente de sus fortalezas y oportunidades, recibe con gratitud la retroalimentación de los demás y asume proactivamente su propio desarrollo.', 'N', 'A'),
    (2, N'Tiene claridad del propósito superior de la organización, alineándolo con sus propósitos personal y profesional, y trabaja por lograr un equilibrio en las dimensiones de su vida.', 'N', 'A'),
    (2, N'Se ocupa de su autocuidado, el cuidado de los demás y la adopción de hábitos saludables.', 'N', 'A'),

    (3, N'Es consciente de los riesgos asociados a la gestión y propone alternativas para mitigar los impactos a la sostenibilidad.', 'N', 'A'),
    (3, N'Participa activamente en las iniciativas que promueve la organización para contribuir al desarrollo sostenible.', 'N', 'A'),
    (3, N'Desarrolla su labor con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 'N', 'A'),

    (4, N'Aplica las herramientas de innovación para optimizar las soluciones que satisfagan las necesidades del cliente interno y externo.', 'N', 'A'),
    (4, N'Asume riesgos y aprende de los errores, perseverando, para obtener nuevas respuestas y resolver retos de un entorno cambiante.', 'N', 'A'),
    (4, N'Aprovecha todos los recursos que ofrece el ecosistema de innovación para lograr de manera ágil soluciones integrales y de alto impacto.', 'N', 'A'),

    (5, N'Cumple sus compromisos en los tiempos previstos, con los recursos asignados y los estándares requeridos, retándose para lograr resultados integrales.', 'N', 'A'),
    (5, N'Se apropia hasta el final de los objetivos que tiene a cargo con recursividad, enfrentando los desafíos con decisión.', 'N', 'A'),
    (5, N'Actúa enfocado en la obtención de los resultados sin caer en excesos de planeación.', 'N', 'A'),

    (6, N'Promueve la diversidad, la equidad y la inclusión, y participa de la movilidad de talento con apertura y sin prejuicios ni sesgos.', 'N', 'A'),
    (6, N'Genera redes de interacción en las diferentes áreas, regiones y negocios para identificar oportunidades y enriquecer su gestión.', 'N', 'A'),
    (6, N'Tiene la capacidad de interactuar con personas de diferentes áreas y regiones para promover la multiculturalidad.', 'N', 'A'),

    (7, N'Se interesa por escuchar, entender y respetar los puntos de vista y las necesidades de invitados, consumidores y demás relacionados.', 'N', 'A'),
    (7, N'Demuestra una actitud de servicio hacia los demás, asegurándose de satisfacer sus necesidades y generar confianza.', 'N', 'A'),
    (7, N'Genera valor a sus grupos relacionados trabajando en red y aportando soluciones que contribuyen al logro de los resultados.', 'N', 'A'),

    (8, N'Construye confianza estableciendo relaciones cercanas en las que interactúa y crea con otros.', 'N', 'A'),
    (8, N'Busca oportunidades y colabora en diversos equipos, compartiendo su conocimiento y experiencia.', 'N', 'A'),
    (8, N'Trabaja con otros y reconoce que juntos logramos más y mejores resultados.', 'N', 'A'),

    (9, N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios de su puesto.', 'N', 'A'),
    (9, N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto.', 'N', 'A'),
    (9, N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando el tiempo, el equipo y los materiales de forma apropiada.', 'N', 'A'),

    (1, N'Visualiza desafíos, tendencias y cambios del entorno, dando resultados con agilidad y simplicidad.', 'S', 'A'),
    (1, N'Direcciona con agilidad y flexibilidad, cambiando el rumbo o replanteando acciones cuando se requiere.', 'S', 'A'),
    (1, N'Genera conversaciones difíciles para afrontar la ambigüedad, impulsando nuevas formas de hacer las cosas y movilizando el cambio.', 'S', 'A'),

    (2, N'Busca la retroalimentación de los demás para complementar la visión propia de sus fortalezas y oportunidades, asumiendo proactivamente su propio desarrollo.', 'S', 'A'),
    (2, N'Reconoce su vulnerabilidad, estimula y acompaña el desarrollo integral de otras personas a través de conversaciones sinceras y asertivas.', 'S', 'A'),
    (2, N'Se ocupa de su autocuidado y el cuidado de los demás, promoviendo la mejora continua de la seguridad y los hábitos saludables.', 'S', 'A'),

    (3, N'Interpreta cómo las tendencias, riesgos y oportunidades globales pueden impactar a la organización y moviliza iniciativas enfocadas a mitigar impactos y crear oportunidades.', 'S', 'A'),
    (3, N'Interactúa e influye con los grupos relacionados, definiendo acciones que generen valor compartido y promuevan la cultura de sostenibilidad.', 'S', 'A'),
    (3, N'Orienta con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 'S', 'A'),

    (4, N'Alinea las iniciativas con la visión y el propósito superior removiendo obstáculos para que la innovación suceda de manera constante.', 'S', 'A'),
    (4, N'Promueve la innovación inspirando a las personas para que se sientan seguras de expresarse, asumir riesgos y tolerar fracasos.', 'S', 'A'),
    (4, N'Desafía el status-quo promoviendo el aprendizaje e iniciativas de transformación que impulsan soluciones novedosas, sin castigar el error.', 'S', 'A'),

    (5, N'Se reta a sí mismo y a los demás para el logro de resultados integrales que contribuyen al propósito superior, acompañando e inspirando el desempeño de otros.', 'S', 'A'),
    (5, N'Hace seguimiento y acompaña el logro de resultados, inspirando la excelencia para la creciente generación de valor.', 'S', 'A'),
    (5, N'Reconoce el desempeño superior de otros, motivando el mejoramiento continuo del nivel de ejecución.', 'S', 'A'),

    (6, N'Aprecia e integra la diversidad, equidad e inclusión y promueve la movilidad para el desarrollo de talento global.', 'S', 'A'),
    (6, N'Incorpora con apertura las mejores prácticas para enriquecer y complementar la propuesta de valor desafiando sus paradigmas y creencias.', 'S', 'A'),
    (6, N'Encuentra la manera más efectiva de cumplir los objetivos estratégicos, a partir del conocimiento del contexto de cada geografía y cultura.', 'S', 'A'),

    (7, N'Se interesa por escuchar, entender y conocer a invitados, consumidores y demás relacionados, reconociendo su individualidad y comprendiendo que cada persona es única e irrepetible.', 'S', 'A'),
    (7, N'Promueve que el equipo de trabajo escuche y comprenda e incorpore las expectativas de los grupos relacionados.', 'S', 'A'),
    (7, N'Diseña y garantiza la implementación de estrategias e indicadores que aseguren la satisfacción, la confianza y el desarrollo de relaciones duraderas.', 'S', 'A'),

    (8, N'Construye y promueve relaciones de confianza, asegurando las condiciones para el trabajo interdependiente y colaborativo.', 'S', 'A'),
    (8, N'Crea espacios de intercambio de conocimientos y experiencias para generar oportunidades de construcción colectiva.', 'S', 'A'),
    (8, N'Moviliza el trabajo con otros, teniendo en cuenta el contexto, logrando los beneficios del trabajo en red.', 'S', 'A'),

    (9, N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios de su puesto.', 'S', 'A'),
    (9, N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto.', 'S', 'A'),
    (9, N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando adecuadamente el tiempo y los recursos asignados.', 'S', 'A');
*/

/*##########################################################################*/
    CREATE TABLE tipo_evaluation(
        te_id INT IDENTITY(1,1) PRIMARY KEY,
        te_nombre NVARCHAR(50) NOT NULL,
        te_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    /*
    INSERT INTO tipo_evaluation(te_nombre)
    VALUES
    (N'Evaluación de calidad')
    */

/*##########################################################################*/
    CREATE TABLE evaluacion(
        ev_id INT IDENTITY(1,1) PRIMARY KEY,
        ev_tipo_evaluation INT NOT NULL,
        ev_fecha DATE NOT NULL,
        ev_categoria VARCHAR(50) NOT NULL,
        ev_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY(ev_tipo_evaluation) REFERENCES tipo_evaluation(te_id)
    );

    /*
    INSERT INTO evaluacion(ev_tipo_evaluation, ev_fecha, ev_categoria)
    VALUES
    (1,  GETDATE(), 'Subordinado'),
    (1,  GETDATE(), 'Jefe a cargo')
    */

/*##########################################################################*/
    CREATE TABLE evaluacion_detalle(
        evd_id INT IDENTITY(1,1) PRIMARY KEY,
        evd_evaluacion INT NOT NULL,
        evd_talento INT NOT NULL,
        evd_detalle_talento INT NOT NULL,
        valor_talento INT NOT NULL DEFAULT 0,
        pordentaje_talento DECIMAL(3,2) NOT NULL DEFAULT 0,
        valor_detalle_talento INT NOT NULL DEFAULT 0,
        FOREIGN KEY(evd_evaluacion) REFERENCES evaluacion(ev_id),
        FOREIGN KEY(evd_talento) REFERENCES talento(tal_id),
        FOREIGN KEY(evd_detalle_talento) REFERENCES detalle_talento(det_tal_id)
    )

    /*
    INSERT INTO evaluacion_detalle(evd_evaluacion, evd_talento, evd_detalle_talento, valor_talento, pordentaje_talento, valor_detalle_talento)
    VALUES
    INSERT INTO evaluacion_detalle(evd_evaluacion, evd_talento, evd_detalle_talento, valor_talento, pordentaje_talento, valor_detalle_talento)
    VALUES
    (1, 1, 1, 10, 0, 0),
    (1, 1, 2, 10, 0, 0),
    (1, 1, 3, 10, 0, 0),
    (1, 2, 1, 15, 0, 0),
    (1, 2, 2, 15, 0, 0),
    (1, 2, 3, 15, 0, 0),
    (1, 3, 1, 10, 0, 0),
    (1, 3, 2, 10, 0, 0),
    (1, 3, 3, 10, 0, 0),
    (1, 4, 1, 10, 0, 0),
    (1, 4, 2, 10, 0, 0),
    (1, 4, 3, 10, 0, 0),
    (1, 5, 1, 10, 0, 0),
    (1, 5, 2, 10, 0, 0),
    (1, 5, 3, 10, 0, 0),
    (1, 6, 1, 15, 0, 0),
    (1, 6, 2, 15, 0, 0),
    (1, 6, 3, 15, 0, 0),
    (1, 7, 1, 15, 0, 0),
    (1, 7, 2, 15, 0, 0),
    (1, 7, 3, 15, 0, 0),
    (1, 8, 1, 15, 0, 0),
    (1, 8, 2, 15, 0, 0),
    (1, 8, 3, 15, 0, 0),
    (1, 9, 1, 0, 0.30, 50),
    (1, 9, 2, 0, 0.30, 25),
    (1, 9, 3, 0, 0.30, 25),
    (2, 1, 4, 10, 0, 0),
    (2, 1, 5, 10, 0, 0),
    (2, 1, 6, 10, 0, 0),
    (2, 2, 4, 15, 0, 0),
    (2, 2, 5, 15, 0, 0),
    (2, 2, 6, 15, 0, 0),
    (2, 3, 4, 10, 0, 0),
    (2, 3, 5, 10, 0, 0),
    (2, 3, 6, 10, 0, 0),
    (2, 4, 4, 10, 0, 0),
    (2, 4, 5, 10, 0, 0),
    (2, 4, 6, 10, 0, 0),
    (2, 5, 4, 10, 0, 0),
    (2, 5, 5, 10, 0, 0),
    (2, 5, 6, 10, 0, 0),
    (2, 6, 4, 15, 0, 0),
    (2, 6, 5, 15, 0, 0),
    (2, 6, 6, 15, 0, 0),
    (2, 7, 4, 15, 0, 0),
    (2, 7, 5, 15, 0, 0),
    (2, 7, 6, 15, 0, 0),
    (2, 8, 4, 15, 0, 0),
    (2, 8, 5, 15, 0, 0),
    (2, 8, 6, 15, 0, 0),
    (2, 9, 4, 0, 0.30, 50),
    (2, 9, 5, 0, 0.30, 25),
    (2, 9, 6, 0, 0.30, 25);
    */


    CREATE TABLE nota(
        nota_id INT IDENTITY(1,1) PRIMARY KEY,
        nota_nombre VARCHAR(20) NOT NULL,
        nota_valor DECIMAL(3,2) NOT NULL,
        nota_estado CHAR(1) NOT NULL DEFAULT 'A'
    )

    /*
    INSERT INTO nota(nota_nombre, nota_valor)
    VALUES
    ('Supera', 1),
    ('Cumple', 0.85),
    ('Cumple parcialmente', 0.65),
    ('No cumple', 0);
    */

/*##########################################################################*/
    CREATE TABLE calificacion(
        cal_id INT IDENTITY(1,1) PRIMARY KEY,
        cal_col_subordinado INT NOT NULL,
        cal_col_jefe_a_cargo INT NOT NULL,
        cal_calificacion_subordinado INT NOT NULL,
        cal_calificacion_jefe INT NOT NULL,
        FOREIGN KEY (cal_id) REFERENCES evaluacion_detalle(evd_id),
        FOREIGN KEY(cal_col_subordinado) REFERENCES colaborador(col_id),
        FOREIGN KEY(cal_col_jefe_a_cargo) REFERENCES colaborador(col_id),
        FOREIGN KEY(cal_calificacion_subordinado) REFERENCES nota(nota_id),
        FOREIGN KEY(cal_calificacion_jefe) REFERENCES nota(nota_id)
    )

    /*
    INSERT INTO calificacion(cal_col_subordinado, cal_col_jefe_a_cargo, cal_calificacion_subordinado, cal_calificacion_jefe)
    VALUES
    (1, 1, 1, 4),
    (1, 2, 2, 4)
    */

/*##########################################################################*/
    CREATE TABLE aspecto_pdi(
        apdi_id INT IDENTITY(1,1) PRIMARY KEY,
        apdi_nombre NVARCHAR(50) NOT NULL,
        apdi_descripcion NVARCHAR(MAX) NOT NULL,
        apdi_estado CHAR(1) NOT NULL DEFAULT 'A'
    )

    /*
    INSERT INTO aspecto_pdi(apdi_nombre, apdi_estado)
    VALUES
    (N'Aprendizaje a través de la prácitca'),
    (N'Interacciones con otros para aprender'),
    (N'Aprendizaje formal')
    */

/*##########################################################################*/
    CREATE TABLE aspecto_pdi_detalle(
        apdid_id INT IDENTITY(1,1) PRIMARY KEY,
        apdid_apdi_id INT NOT NULL,
        apdid_texto NVARCHAR(MAX) NOT NULL,
        apdid_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY(apdid_apdi_id) REFERENCES aspecto_pdi(apdi_id)
    )

    /*
    INSERT INTO aspecto_pdi_detalle(apdid_apdi_id, apdid_texto, apdid_estado)
    VALUES
    (1, N'Actividades o tareas a desarrollar en el trabajo diario o proyectos especiales, que nos permitan un aprendizaje integrado en el flujo de trabajo', 'A'),
    (2, N'Coaching, mentoring o acompañamiento del jefe. Actividades que requieren compartir conocimiento con otros, interacción y aprendizaje de otras personas', 'A'),
    (3, N'Formaciones, seminarios, talleres, capacitaciones', 'A')
    */

/*##########################################################################*/
    CREATE TABLE pdi_detalle(
        pdid_id INT IDENTITY(1,1) PRIMARY KEY,
        pdid_id_eval_detalle INT NOT NULL,
        pdid_apdi_nombre INT NOT NULL,
        pdid_apdid_texto  INT NOT NULL,
    )

    /*
    INSERT INTO pdi_detalle(pdid_id_eval_detalle, pdid_apdi_nombre, pdid_apdid_texto)
    VALUES
    (1,1,1),
    (1,2,1),
    (1,3,1),
    (1,4,1),
    (1,4,2),
    (1,4,3),
    (1,5,1),
    (1,5,2),
    (1,5,3),
    (1,6,1),
    (1,6,2),
    (1,6,3),
    (1,7,1),
    (1,7,2),
*/


    CREATE TABLE tipo_salida(
        tipo_salida_id INT IDENTITY(1,1) PRIMARY KEY,
        tipo_salida_nombre NVARCHAR(50) NOT NULL,
        tipo_salida_estado CHAR(1) NOT NULL DEFAULT 'A'
    )


    CREATE TABLE motivo_salida(
        motivo_salida_id INT IDENTITY(1,1) PRIMARY KEY,
        motivo_salida_nombre NVARCHAR(50) NOT NULL,
        motivo_salida_estado CHAR(1) NOT NULL DEFAULT 'A'
    )


    CREATE TABLE tipo_carta(
        tipo_carta_id INT IDENTITY(1,1) PRIMARY KEY,
        tipo_carta_nombre NVARCHAR(50) NOT NULL,        
        tipo_carta_estado CHAR(1) NOT NULL DEFAULT 'A'
    )


    CREATE TABLE tipo_novedad(
        tipo_novedad_id INT IDENTITY(1,1) PRIMARY KEY,
        tipo_novedad_nombre NVARCHAR(50) NOT NULL,
        tipo_novedad_estado CHAR(1) NOT NULL DEFAULT 'A'
    )


    CREATE TABLE tipo_reporte(
        tipo_reporte_id INT IDENTITY(1,1) PRIMARY KEY,
        tipo_reporte_nombre NVARCHAR(50) NOT NULL,
        tipo_reporte_creador UNIQUEIDENTIFIER NOT NULL,
        tipo_reporte_fecha DATE NOT NULL,
        tipo_reporte_estado CHAR(1) NOT NULL DEFAULT 'A'
    )


    CREATE TABLE detalle_reporte(
        det_report_id INT IDENTITY(1,1) PRIMARY KEY,
        det_report_tipo_reporte INT NOT NULL,
        det_report_col_id UNIQUEIDENTIFIER NOT NULL,
        det_report_fecha DATE NOT NULL,
        det_report_estado CHAR(1) NOT NULL DEFAULT 'A'
    )
    


    END