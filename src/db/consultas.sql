SELECT 
    C.col_id AS id,
    C.col_identificacion AS identificacion,
    C.col_nombre AS nombre,
    C.col_primer_apellido AS primer_apellido,
    C.col_segundo_apellido AS segundo_apellido,
    P.pue_nombre AS puesto,
    C.col_email AS email,
    C.col_estado AS estado,
    DEP.depto_nombre AS departamento,
    DIR.dir_nombre AS direccion,
    C.col_clave AS clave,
    C.col_personal_cargo AS a_cargo,
    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
    C.col_fecha_ingreso AS fecha_ingreso,
    C.col_respuesta AS respuesta
FROM colaborador C
INNER JOIN puesto P
ON C.col_puesto = P.pue_id
INNER JOIN departamento DEP
ON C.col_depto_pertence = DEP.depto_id
INNER JOIN direccion DIR
ON C.col_dir_pertenece = DIR.dir_id
INNER JOIN colaborador C2
ON C.col_jefe_id = C2.col_id
WHERE 1=1


UPDATE colaborador
SET col_a_cargo = 'S'

SELECT * FROM reporte WHERE rep_col_id_solicita = '71fc6e2f-7028-412c-9904-96bd380824d1'
WHERE col_jefe_id = 'D594E981-410A-4085-90F5-EFE2A3BAE951'


SELECT * FROM descripcion_talento
SELECT * FROM colaborador WHERE col_id = '2F9B1306-45FE-4065-B7D9-41D3EABA3CE8'
SELECT * FROM permiso
SELECT * FROM reporte
SELECT * FROM tipo_reporte


SELECT 
                            T.tal_id AS id,
                            T.tal_nombre AS nombre,
                            T.tal_nota AS nota,
                            T.tal_estado AS estado,
                            T.tal_porcentaje AS porcentaje,
                            DT.desc_tal_id AS descripcion_id,
                            DT.desc_tal_texto AS descripcion,
                            DT.desc_tal_personal_a_cargo AS a_cargo,
                            DT.desc_tal_estado AS estado_descripcion
                        FROM talento T
                        JOIN descripcion_talento DT
                        ON DT.desc_tal_tal_pertenece = T.tal_id
                        JOIN colaborador C
                        ON C.col_personal_cargo = DT.desc_tal_personal_a_cargo
                        WHERE T.tal_estado = 'A'
                        AND DT.desc_tal_estado = 'A'
                        AND C.col_personal_cargo = 'si'

DELETE FROM colaborador 
WHERE col_identificacion = '119160949'

INSERT INTO colaborador(
            col_id,
            col_identificacion,
            col_nombre,
            col_primer_apellido,
            col_segundo_apellido,
            col_puesto,
            col_email,
            col_estado,
            col_depto_pertenece,
            col_dir_pertenece,
            col_pais,
            col_clave,
            col_personal_cargo,
            col_jefe_id,
            col_fecha_ingreso,
            col_respuesta
            )
            VALUES(
            CAST((SELECT NEWID() AS uuid) AS UNIQUEIDENTIFIER),
            '987654321',
            'prueba',
            'prueba',
            'prueba',
            1,
            'email',
            'A',
            4,
            1,
            1,
            'hashedPassword',
            'no',
            'c5459bbe-d834-4400-8d58-5727c384d4a0',
            '2024/1/1',
            0
            )

SELECT * FROM direccion
SELECT * FROM departamento

INSERT INTO departamento ( depto_nombre, depto_estado)
VALUES
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
('VENDEDORES','A')


INSERT INTO direccion ( dir_nombre, dir_depto_pertenece, dir_estado)
VALUES
('CDA',11,'A'),
('MANTENIMIENTO',12,'A'),
('CDA',13,'A'),
('CDA',14,'A'),
('CDA',15,'A'),
('CDA',16,'A'),
('COMERCIAL',17,'A'),
('DHCO',18,'A'),
('CDA',19,'A'),
('FINANCIERA',20,'A'),
('GERENCIA DE PAIS',21,'A'),
('GERENCIA GENERAL',22,'A'),
('CDA',23,'A'),
('SIG',24,'A'),
('COMERCIAL',25,'A'),
('LIDERES DE EQUIPO',25,'A'),
('LOGISTICA',26,'A'),
('MANTENIMIENTO',27,'A'),
('MERCADEO',28,'A'),
('CDA',29,'A'),
('MANTENIMIENTO',30,'A'),
('SIG',31,'A'),
('COMERCIAL',32,'A'),
('CDA',33,'A'),
('COMERCIAL',34,'A')





INSERT INTO colaborador(
            col_id,
            col_identificacion,
            col_nombre,
            col_primer_apellido,
            col_segundo_apellido,
            col_puesto,
            col_email,
            col_estado,
            col_depto_pertenece,
            col_dir_pertenece,
            col_pais,
            col_clave,
            col_personal_cargo,
            col_jefe_id,
            col_fecha_ingreso,
            col_respuesta
            )
            VALUES(
            CAST((SELECT NEWID() AS uuid) AS UNIQUEIDENTIFIER),
            '987654321',
            'prueba',
            'prueba',            
            'prueba',
            1,
            'email',
            'A',
            4,
            1,
            1,
            'hashedPassword',
            'no',
            'c5459bbe-d834-4400-8d58-5727c384d4a0',
            '2024/1/1',
            0
            )

TRUNCATE TABLE direccion
TRUNCATE TABLE departamento
DELETE FROM direccion

TRUNCATE TABLE colaborador

DROP TABLE jerarquia

TRUNCATE TABLE respuesta

SELECT * FROM colaborador

INSERT INTO puesto (pue_nombre)
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


UPDATE colaborador
SET  col_respuesta = '0'
SELECT * FROM colaborador
WHERE col_id = '52DC0839-0BE8-47A5-9BCD-EBCDB4F17266' 


SELECT * FROM colaborador 
WHERE col_id = 'D594E981-410A-4085-90F5-EFE2A3BAE951' 



SELECT * FROM respuesta 
WHERE res_col_id_subordinado = '52DC0839-0BE8-47A5-9BCD-EBCDB4F17266'

DELETE FROM respuesta
WHERE res_id > 3243 
AND res_id < 3271 


                    SELECT 
                    TS.ts_id AS id,
                    TS.ts_nombre AS nombre,
                    TS.ts_estado AS estado
                    FROM tipo_salida TS
                    WHERE 1=1


SELECT 
rep_id as id,
rep_col_id_solicita as solicitante,
rep_col_jefe_inmediato as jefe,
rep_tipo_reporte as tipo_reporte,
rep_detalle_reporte as detalle_reporte,

FROM reporte 



                SELECT 
                    RD.rd_nombre_documento as nombre_documento,
                    RD.rd_documento as documento,
                    C.col_identificacion as identificacion,
                    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
                    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
                    R.rep_fec_inicio as fecha_inicio,
                    R.rep_fec_fin as fecha_fin,
                    R.rep_detalle_reporte as detalle_reporte,
                    R.rep_fec_envio_doc as fecha_envio_doc,
                    R.rep_estado as estado
                FROM reporte_documento RD
                RIGHT JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
                INNER JOIN colaborador C2 ON R.rep_col_jefe_inmediato = C2.col_id

SELECT * FROM tipo_documento

SELECT * FROM colaborador

SELECT * FROM reporte

                SELECT 
                    RD.rd_nombre_documento as nombre_documento,
                    RD.rd_documento as documento,
                    C.col_identificacion as identificacion,
                    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
                    D.depto_nombre as departamento,
                    TN.tn_nombre,
                    R.rep_fec_inicio as fecha_inicio,
                    R.rep_fec_fin as fecha_fin,
                    R.rep_detalle_reporte as detalle_reporte,
                    R.rep_fec_envio_doc as fecha_envio_doc,
                    R.rep_estado as estado
                FROM reporte_documento RD
                RIGHT JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
                INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                INNER JOIN tipo_novedad TN ON R.rep_tipo_novedad = TN.tn_id

                SELECT 
                    C.col_identificacion as identificacion,
                    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
                    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
                    CONVERT (varchar(10), R.rep_fec_inicio, 103) AS fecha_inicio,
                    CONVERT (varchar(10), R.rep_fec_fin, 103) AS fecha_fin,
                    R.rep_detalle_reporte as detalle_reporte,
                    CONVERT (varchar(10), R.rep_fec_envio_doc, 103) AS fecha_envio_doc,
                    R.rep_estado as estado,
                    RD.rd_nombre_documento as nombre_documento,
                    RD.rd_documento as documento
                FROM reporte_documento RD
                RIGHT JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
                INNER JOIN colaborador C2 ON R.rep_col_jefe_inmediato = C2.col_id


SELECT * FROM puesto

SELECT 
    R.rep_id as id,
    R.REP
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    R.rep_fec_inicio as fecha_inicio,
    R.rep_fec_fin as fecha_fin,
    R.rep_detalle_reporte as detalle_reporte,
    R.rep_estado as estado
FROM reporte R
INNER JOIN colaborador C ON R.rep_col_id_solicita = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_jefe_inmediato = C2.col_id


cedula | nombre | correo | pais | depto | jefe | puesto | fecha salida | tipo salida | motivo salida | docs 


SELECT
    C.col_identificacion,
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS solicitante,
    C.col_email,
    C.col_pais_id,
    D.depto_nombre,
    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    P.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    MS.ms_nombre,
    RD.rd_id AS documento_id,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD
RIGHT JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
INNER JOIN departamento D ON R.rep_tp_depto_traslado = D.depto_id
INNER JOIN puesto P ON C.col_puesto_id = P.pue_id
INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
WHERE R.rep_tipo_reporte_id = 1


SELECT 
    C.col_identificacion,
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    CASE 
        WHEN MS.ms_id = 14 THEN R.rep_otro
        ELSE MS.ms_nombre
    END AS motivo_salida,
    RD.rd_id AS documento_id,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
INNER JOIN pais PA ON R.rep_pais_solicita = PA.pais_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN puesto PU ON C.col_puesto_id = Pu.pue_id
INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
WHERE R.rep_tipo_reporte_id = 1

SELECT * FROM historico_salida_colaborador


SELECT 
    C.col_identificacion,
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre, ' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    CASE 
        WHEN MS.ms_id = 14 THEN R.rep_otro
        ELSE MS.ms_nombre
    END AS motivo_salida,
    STRING_AGG(RD.rd_nombre_documento, ', ') AS documentos
FROM reporte_documento RD
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
INNER JOIN pais PA ON R.rep_pais_solicita = PA.pais_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN puesto PU ON C.col_puesto_id = PU.pue_id
INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
WHERE R.rep_tipo_reporte_id = 1
GROUP BY 
    R.rep_id,
    C.col_identificacion,
    C.col_nombre, C.col_segundo_nombre, C.col_primer_apellido, C.col_segundo_apellido,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    C2.col_nombre, C2.col_segundo_nombre, C2.col_primer_apellido, C2.col_segundo_apellido,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,   
    MS.ms_id, R.rep_otro, MS.ms_nombre;

--############SALIDAS################
SELECT 
    R.rep_id AS id_reporte,
    C.col_identificacion,
    CONCAT(C.col_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    CONCAT(C2.col_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    CASE 
        WHEN MS.ms_id = 14 THEN R.rep_otro
        ELSE MS.ms_nombre
    END AS motivo_salida,
    (
        SELECT 
            RD.rd_id AS documento_id,
            RD.rd_nombre_documento AS nombre_documento
        FROM reporte_documento RD
        WHERE RD.rd_id_reporte = R.rep_id
        FOR JSON PATH
    ) AS documentos
FROM reporte R
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
INNER JOIN pais PA ON R.rep_pais_solicita = PA.pais_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN puesto PU ON C.col_puesto_id = PU.pue_id
INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
WHERE R.rep_tipo_reporte_id = 1
GROUP BY 
    R.rep_id,
    C.col_identificacion,
    C.col_nombre, C.col_segundo_nombre, C.col_primer_apellido, C.col_segundo_apellido,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    C2.col_nombre, C2.col_segundo_nombre, C2.col_primer_apellido, C2.col_segundo_apellido,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    MS.ms_id, R.rep_otro, MS.ms_nombre;

--###########VACACIONES################

SELECT 
    R.rep_id AS id_reporte,
    C.col_identificacion,
    CONCAT(C.col_nombre, ' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    D.depto_nombre,
    CONCAT(C2.col_nombre, ' ', C2.col_segundo_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    R.rep_fec_inicio,
    R.rep_fec_fin,
    R.rep_detalle_reporte,
    CASE 
        WHEN R.rep_estado = 'S' THEN 'Solicitado'
        WHEN R.rep_estado = 'P' THEN 'Pendiente'
        WHEN R.rep_estado = 'A' THEN 'Aceptado'
        WHEN R.rep_estado = 'D' THEN 'Rechazado'
    END AS estado,
    CASE
        WHEN R.rep_fec_envio_doc IS NULL THEN '-'
        ELSE FORMAT(R.rep_fec_envio_doc, 'yyyy-MM-dd') -- Formateo opcional, depende de tu necesidad
    END AS fec_envio_doc,
    RD.rd_id AS documento_id,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD 
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON C.col_jefatura_id = C2.col_id 
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
WHERE R.rep_tipo_reporte_id = 2

--###########TRASLADOS################

SELECT 
    R.rep_id AS id_reporte,
    C.col_identificacion,
    CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    CONCAT(C2.col_nombre,' ',C2.col_primer_apellido,' ', C2.col_segundo_apellido) AS jefe,
    R.rep_fec_inicio as fecha_traslado,
    R.rep_tp_motivo_traslado,
    D.depto_nombre,
    D2.depto_nombre,
    R.rep_fec_envio_doc,
    RD.rd_id AS documento_id,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD 
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON C.col_jefatura_id = C2.col_id 
INNER JOIN departamento D ON R.rep_tp_depto_actual = D.depto_id
INNER JOIN departamento D2 ON R.rep_tp_depto_traslado = D2.depto_id
WHERE R.rep_tipo_reporte_id = 3

--###########INCAPCIONES################
SELECT 
    R.rep_id AS id_reporte,
    C.col_identificacion,
    CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    D.depto_nombre,
    TN.tn_nombre,
    RD.rd_id AS documento_id,
    R.rep_fec_inicio,
    R.rep_fec_fin,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD 
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN tipo_novedad TN ON R.rep_il_tipo_novedad = TN.tn_id
WHERE R.rep_tipo_reporte_id = 4

--###########CARTAS################

SELECT 
    R.rep_id AS id_reporte,
    C.col_identificacion,
    CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS nombre_colaborador_aplica,
    C.col_email,
    D.depto_nombre,
    TC.tc_nombre,
    CASE
        WHEN R.rep_detalle_reporte IS NOT NULL THEN R.rep_detalle_reporte
        ELSE '-'
    END AS detalle_reporte,
    R.rep_ca_email_envio,
    RD.rd_id AS documento_id,
    RD.rd_nombre_documento AS nombre_documento
FROM reporte_documento RD 
INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN tipo_carta TC ON R.rep_ca_tipo_carta = TC.tc_id
WHERE R.rep_tipo_reporte_id = 5

declare @sql nvarchar(max);



SELECT * FROM reporte
SELECT * FROM reporte_documento


SELECT 
    R.rep_id AS id,
    C.col_identificacion AS identificacion,
    CONCAT(C.col_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS subordinado,
    C.col_email AS email,
    PA.pais_acronimo AS pais,
    D.depto_nombre AS departamento,
    CONCAT(C2.col_nombre,' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS jefe,
    PU.pue_nombre AS puesto,
    R.rep_fec_fin AS fecha_fin,
    TS.ts_nombre AS tipo_salida,
    CASE 
        WHEN MS.ms_id = 14 THEN R.rep_otro
        ELSE MS.ms_nombre
    END AS motivo_salida,
    (
        SELECT 
            RD.rd_id AS documento_id,
            RD.rd_nombre_documento AS nombre_documento
        FROM reporte_documento RD
        WHERE RD.rd_id_reporte = R.rep_id
        FOR JSON PATH
    ) AS documento
FROM reporte R
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN colaborador C2 ON R.rep_col_id_solicita = C2.col_id
INNER JOIN pais PA ON R.rep_pais_solicita = PA.pais_id
INNER JOIN departamento D ON C.col_depto_id = D.depto_id
INNER JOIN puesto PU ON C.col_puesto_id = PU.pue_id
INNER JOIN tipo_salida TS ON R.rep_sp_tipo_salida = TS.ts_id
INNER JOIN motivo_salida MS ON R.rep_sp_motivo_salida = MS.ms_id
WHERE R.rep_tipo_reporte_id = 1
GROUP BY 
    R.rep_id,
    C.col_identificacion,
    C.col_nombre, C.col_primer_apellido, C.col_segundo_apellido,
    C.col_email,
    PA.pais_acronimo,
    D.depto_nombre,
    C2.col_nombre, C2.col_primer_apellido, C2.col_segundo_apellido,
    PU.pue_nombre,
    R.rep_fec_fin,
    TS.ts_nombre,
    MS.ms_id, R.rep_otro, MS.ms_nombre;


SELECT * FROM colaborador



SELECT 
    R.rep_id as id,
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombreSolicitante,
    TR.tr_nombre as tipo_reporte,
    R.rep_fec_inicio as fecha_inicio,
    R.rep_fec_fin as fecha_fin,
    R.rep_detalle_reporte as detalle_reporte,
    R.rep_estado as estado
FROM reporte R
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN tipo_reporte TR ON R.rep_tipo_reporte_id = TR.tr_id
INNER JOIN 


SELECT 
    R.rep_id AS id,
    CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombreSolicitante,
    TR.tr_nombre AS tipo_reporte,
    R.rep_fec_inicio AS fecha_inicio,
    R.rep_fec_fin AS fecha_fin,
    R.rep_detalle_reporte AS detalle_reporte,
    R.rep_estado AS estado,
    RD.rd_documento AS documento,
    RD.rd_nombre_documento AS nombre_documento
    FROM reporte_documento RD
LEFT JOIN reporte R ON R.rep_id = RD.rd_id_reporte
INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
INNER JOIN tipo_reporte TR ON R.rep_tipo_reporte_id = TR.tr_id


SELECT * FROM reporte_documento RD
LEFT JOIN reporte ON R.rep_id = RD.rep_id

SELECT * FROM reporte_documento

SELECT * FROM colaborador
SELECT * FROM permiso



                    SELECT 
                        R.rep_id AS id,
                        CONCAT(C.col_nombre, ' ', C.col_segundo_nombre,' ', C.col_primer_apellido, ' ', C.col_segundo_apellido) AS nombreSolicitante,
                        TR.tr_nombre AS tipo_reporte,
                        R.rep_fec_inicio AS fecha_inicio,
                        R.rep_fec_fin AS fecha_fin,
                        R.rep_detalle_reporte AS detalle_reporte,
                        R.rep_estado AS estado,
                        (
                            SELECT 
                                RD.rd_id AS documento_id,
                                RD.rd_nombre_documento AS nombre_documento
                            FROM reporte_documento RD
                            WHERE RD.rd_id_reporte = R.rep_id
                            FOR JSON PATH
                        ) AS documentos
                        FROM reporte_documento RD
                    LEFT JOIN reporte R ON R.rep_id = RD.rd_id_reporte
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN tipo_reporte TR ON R.rep_tipo_reporte_id = TR.tr_id
                    WHERE 1 = 1

                                                (
                                SELECT 
                                    RD.rd_id AS documento_id,
                                    RD.rd_nombre_documento AS nombre_documento
                                FROM reporte_documento RD
                                WHERE RD.rd_id_reporte = R.rep_id
                                FOR JSON PATH
                            ) AS documentos


                            SELECT * FROM tipo_reporte 


                    SELECT 
                        C.col_identificacion AS identificacion,
                        CONCAT(C.col_nombre,' ',C.col_primer_apellido,' ', C.col_segundo_apellido) AS colaborador,
                        C.col_email AS email,
                        D.depto_nombre AS departamento,
                        TN.tn_nombre AS tipo_novedad,
                        FORMAT(R.rep_fec_inicio, 'dd/MM/yyyy') AS fecha_inicio,
                        FORMAT(R.rep_fec_fin, 'dd/MM/yyyy') AS fecha_fin,
                        RD.rd_id AS documento_id,
                        RD.rd_nombre_documento AS nombre_documento
                    FROM reporte_documento RD 
                    INNER JOIN reporte R ON RD.rd_id_reporte = R.rep_id
                    INNER JOIN colaborador C ON R.rep_col_id_aplica = C.col_id
                    INNER JOIN departamento D ON C.col_depto_id = D.depto_id
                    INNER JOIN tipo_novedad TN ON R.rep_il_tipo_novedad = TN.tn_id
                    WHERE R.rep_tipo_reporte_id = 4